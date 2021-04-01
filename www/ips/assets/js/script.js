$.fn.dataTableExt.ofnSearch['dom-input'] = function(value) {
  return $(value).val();
};

/* Create an array with the values of all the input boxes in a column */
$.fn.dataTable.ext.order['dom-text'] = function(settings, col) {
  return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
    return $('input', td).val();
  });
};

/* Create an array with the values of all the input boxes in a column, parsed as numbers */
$.fn.dataTable.ext.order['dom-text-numeric'] = function(settings, col) {
  return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
    return $('input', td).val() * 1;
  });
};

(function($) {
  'use strict';

  window.Dropzone.autoDiscover = false;

  var _serverId;
  var _projectId;
  var _projectAddSignalId;
  var _projectAddUserId;
  var _signalId;
  var _signalTypeId;
  var _userId;

  var serverLogoUpload;
  var serverLogoUploadFile = null;

  var $preloader = $('#preloader');
  var $editServer = $('#editServer');
  var $editProject = $('#editProject');
  var $projectAddSignal = $("#modalAddSignal");
  var $projectAddSignalTable;
  var $projectAddUser = $("#modalAddUser");
  var $projectAddUserTable;
  var $editSignal = $('#editSignals');
  var $editSignalType = $('#editSignalType');
  var $editUser = $('#editUsers');
  var $modalAddAppUsers = $('#modalAddAppUsers');
  var $addAppUsersTable;

  var dropdownSelectInit = function(select) {
    var $inputGet = select.find('.input-select');
    var $select = select.find('.select');
    var $selected = select.find('.dropdown-item').eq($inputGet.val() - 1);

    $selected.children().data('selected', 'selected');

    $select.html($selected.children().html());
  };

  $('.js-dropdown-select').each(function() {
    dropdownSelectInit($(this));
  });

  $('.js-dropdown-select').on('click', '.dropdown-item', function() {
    var $selected = $(this);

    $selected.addClass('active')
    .children().attr('data-selected', 'selected');

    $selected.siblings().removeClass('active')
    .children().attr('data-selected', '');
  })
  .on('hide.bs.dropdown', function(e) {
    var $inputGet = $(this).find('.input-select');
    var $select = $(e.relatedTarget).find('.select');
    var $value = $(this).find('.dropdown-item.active .option');

    $inputGet.val($value.data('value'));
    $select.html($value.html());
  });

  $('.js-btn-edit, .js-btn-remove').tooltip({
    container: '.page-container',
    placement: 'top',
    boundary: 'viewport',
    offset: 0
  });

  function checkboxesTables($el) {
    var $checkAll = $('[type="checkbox"][data-target="' +
                    $el.attr('id') + '"]');

    var $checkboxBind = $('[type="checkbox"][id="' +
                        $el.data('target') + '"]');

    var $checkboxes = $('[type="checkbox"][data-target="' +
                      $checkboxBind.attr('id') + '"]');

    var $select = $el.closest('tr');

    if ($el.hasClass('js-select-all')) {
      if ($el.prop('checked') === true) {
        $checkAll.prop('checked', true).closest('tr').addClass('select');
      } else {
        $checkAll.prop('checked', false).closest('tr').removeClass('select');
      }
    } else {
      if ($el.prop('checked') === true) {
        $select.addClass('select');
      } else {
        $select.removeClass('select');
      }

      $checkboxes.each(function(index) {
        if ($checkboxes.filter(':checked').length - 1 === index) {
          $checkboxBind.prop('checked', true);
        } else {
          $checkboxBind.prop('checked', false);
        }
      });
    }
  }

  $('table').on('click', ' [type="checkbox"]', function() {
    checkboxesTables($(this));
  });

  $('table').on('page.dt', function() {
    var $table = $(this);

    setTimeout(function() {
      $table.find('[type="checkbox"]:not(.js-select-all)').each(function() {
        checkboxesTables($(this));
      });
    }, 30);
  });

  $('.custom-file').on('click', '.btn', function() {
    $(this).next().trigger('click');
  });

  function loadServer(id) {
    var data = {id: id};

    $preloader.removeClass('d-none');

    $.get({
      url: "/Server/DetailsAjax",
      data: data
    })
    .done(function(result) {
      $editServer.find('form input[name="LogoToken"]').val(result.LogoToken);
      $editServer.find('form input[name="Address"]').val(result.Address);
      $editServer.find('form input[name="Name"]').val(result.Name);
      _serverId = id;
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  }

  function loadProject(id) {
    var data = {id: id};

    $preloader.removeClass('d-none');

    $.get({
      url: "/Project/DetailsAjax",
      data: data
    })
    .done(function(result) {
      $editProject.find('.modal-header img').attr('src', result.IconPath);
      $editProject.find('.modal-title').text(result.Name);
      $editProject.find('form input[name="Name"]').val(result.Name);
      $editProject.find('form input[name="Notes"]').val(result.Notes);
      $editProject.find('form input[name="Location"]').val(result.Location);
      $editProject.find('form input[name="LocationEn"]').val(result.LocationEn);
      $editProject.find('form input[name="LocationNl"]').val(result.LocationNl);
      $editProject.find('form input[name="LocationFr"]').val(result.LocationFr);
      $editProject.find('form input[name="Icon"]').val(result.Icon);
      _projectId = id;

      dropdownSelectInit($editProject.find('.js-dropdown-select'));
    }).always(function() {
      $preloader.addClass('d-none');
    });
  }

  function loadProjectSignal(id) {
    var $searchFilter = $projectAddSignal.find('.search-filter');

    var data = {id: id};

    $preloader.removeClass('d-none');

    $projectAddSignalTable = $('#projectAddSignals').DataTable({
      dom: 'lrtip',
      lengthChange: false,
      info: false,
      order: [],
      ajax: {
        url: '/ProjectDetails/AddSignalIndexAjax',
        post: 'GET',
        data: data,
        dataSrc: "Items"
      },
      columnDefs: [
        {
          targets: 0,
          orderable: false,
          className: 'pr-0 col-0',
          render: function(data, type, row, meta) {
            return renderCheckbox(data.Id, 'signalID0');
          }
        }
      ],
      columns: [
        {data: null},
        {data: "Name"},
        {data: "Location"},
        {data: "Type"},
        {data: "TypeName"},
        {data: "Message"},
        {data: "Owner"},
        {data: "ServerName"},
        {data: "ServerAddress"}
      ],
      initComplete: function() {
        _projectAddSignalId = id;
        $preloader.addClass('d-none');
      }
    });
    dataTableSearchFilter($searchFilter, $projectAddSignalTable);
  }

  function loadProjectUser(id) {
    var $searchFilter = $projectAddUser.find('.search-filter');

    var data = {id: id};

    $preloader.removeClass('d-none');

    $projectAddUserTable = $('#projectAddUsers').DataTable({
      dom: 'lrtip',
      lengthChange: false,
      info: false,
      order: [],
      ajax: {
        url: '/ProjectDetails/AddUserIndexAjax',
        post: 'GET',
        data: data,
        dataSrc: "Items"
      },
      autoWidth: false,
      bAutoWidth: false,
      columnDefs: [
        {
          targets: 0,
          orderable: false,
          className: 'pr-0 col-0',
          render: function(data, type, row, meta) {
            return renderCheckbox(data.Id, 'userID0');
          }
        }
      ],
      columns: [
        {data: null},
        {data: "Name"},
        {data: "Email"},
        {data: "Phone", className: "text-left"}
      ],
      initComplete: function() {
        _projectAddUserId = id;
        $preloader.addClass('d-none');
      }
    });

    dataTableSearchFilter($searchFilter, $projectAddUserTable);
  }

  function loadSignal(id) {
    var data = {id: id};

    var _title = $editSignal.find('form .modal-title');
    var _Location = $editSignal.find('form input[name="Location"]');
    var _LocationEn = $editSignal.find('form input[name="LocationEn"]');
    var _LocationNl = $editSignal.find('form input[name="LocationNl"]');
    var _LocationFr = $editSignal.find('form input[name="LocationFr"]');
    var _Name = $editSignal.find('form input[name="Name"]');
    var _NameEn = $editSignal.find('form input[name="NameEn"]');
    var _NameNl = $editSignal.find('form input[name="NameNl"]');
    var _NameFr = $editSignal.find('form input[name="NameFr"]');

    $preloader.removeClass('d-none');

    $.get({
      url: "/signal/DetailsSignalAjax",
      data: data
    }).done(function(result) {
      _title.text(result.Name);

      $('#Owner').text(result.Owner);
      $('#Type').text(result.Type);
      $('#NotificationMessage').text(result.NotificationMessage);
      $('#ServerGuid').text(result.ServerGuid);
      $('#ServerName').text(result.ServerName);
      $('#ServerAddress').text(result.ServerAddress);

      _Location.val(result.Location ? result.Location : "");
      _LocationEn.val(result.LocationEn ? result.LocationEn : "");
      _LocationNl.val(result.LocationNl ? result.LocationNl : "");
      _LocationFr.val(result.LocationFr ? result.LocationFr : "");
      _Name.val(result.Name ? result.Name : "");
      _NameEn.val(result.NameEn ? result.NameEn : "");
      _NameNl.val(result.NameNl ? result.NameNl : "");
      _NameFr.val(result.NameFr ? result.NameFr : "");

      _signalId = id;

      dropdownSelectInit($editSignal.find('.js-dropdown-select'));
    }).always(function() {
      $preloader.addClass('d-none');
    });
  }

  function loadSignalType(id) {
    var data = {id: id};

    var _title = $editSignalType.find('form .modal-title');
    var _Message = $editSignalType.find('form input[name="Message"]');
    var _MessageEn = $editSignalType.find('form input[name="MessageEn"]');
    var _MessageNl = $editSignalType.find('form input[name="MessageNl"]');
    var _MessageFr = $editSignalType.find('form input[name="MessageFr"]');

    $preloader.removeClass('d-none');

    $.get({
      url: "/signal/DetailsNotificationTypeAjax",
      data: data
    })
    .done(function(result) {
      _title.text(result.Type);

      $('#Type').text(result.Type);
      $('#NotificationMessage').text(result.NotificationMessage);
      $('#ServerGuid').text(result.ServerGuid);
      $('#ServerName').text(result.ServerName);
      $('#ServerAddress').text(result.ServerAddress);

      _Message.val(result.Message ? result.Message : "");
      _MessageEn.val(result.MessageEn ? result.MessageEn : "");
      _MessageNl.val(result.MessageNl ? result.MessageNl : "");
      _MessageFr.val(result.MessageFr ? result.MessageFr : "");

      _signalTypeId = id;

      dropdownSelectInit($editSignalType.find('.js-dropdown-select'));
    }).always(function() {
      $preloader.addClass('d-none');
    });
  }

  function loadUser(id) {
    var data = {id: id};

    $preloader.removeClass('d-none');

    $.get({
      url: "/user/DetailsAjax",
      data: data
    })
    .done(function(result) {
      $editUser.find('.modal-title').text('Edit data of "' + result.Name + '"');
      $editUser.find('form input[name="name"]').val(result.Name);
      $editUser.find('form input[name="Email"]').val(result.Email);
      $editUser.find('form input[name="Phone"]').val(result.Phone);
      _userId = id;
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  }

  function tableAddAppUsers() {
    var $searchFilter = $modalAddAppUsers.find('.search-filter');

    $addAppUsersTable = $('#addUsersTable').DataTable({
      dom: 'lrtip',
      lengthChange: false,
      info: false,
      pageLength: 9,
      aaSorting: [],
      columnDefs: [
        {
          type: "dom-input",
          targets: [0, 1, 2]
        }, {
          targets: 3,
          orderable: false
        }
      ],
      columns: [
        {orderDataType: "dom-text", type: 'string'},
        {orderDataType: "dom-text", type: 'string'},
        {orderDataType: "dom-text-numeric"},
        null
      ]
    });

    dataTableSearchFilter($searchFilter, $addAppUsersTable);
  }

  tableAddAppUsers();

  function dataTableSearchFilter(filter, table) {
    filter.on('submit', function(e) {
      e.preventDefault();

      $(this).find('button').attr('type', 'submit');
    });

    filter.find('input').on('input', function() {
      table.search($(this).val()).draw();
    });
  }

  function getDelete(id, url) {
    var data = {id: id};

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'DELETE',
      url: url,
      data: data
    })
    .done(function() {
      window.location.reload();
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  }

  function doneResult(result, err, loader) {
    if (result.Status) {
      err.html('');

      $(result.Errors).each(function() {
        err.append('<p>' + this + '</p>');
      });
      err.show();
    } else {
      err.hide();

      if (!loader) {
        window.location.reload();
      }
    }
  }

  function renderCheckbox(id, target) {
    return '<label class="custom-control custom-checkbox d-inline-flex' +
    'align-items-center"><input type="checkbox" class="custom-control-input"' +
    'id="' + id + '" data-target="' + target + '"/>' +
    '<span class="custom-control-label pr-0"></span></label>';
  }

  function updateTable(table, clear) {
    if (typeof table !== 'undefined') {
      table.destroy();
      clear.find('tbody').empty();
    }
  }

  /**
   * Серверы
   */
  $('#servers').on('click', '.js-btn-edit', function() {
    var id = $(this).data("id");
    loadServer(id);
  });

  $editServer.on('submit', 'form', function(e) {
    e.preventDefault();

    var data = new FormData();
    var $form = $(this);
    var $error = $form.find('.help-block');

    data.append("logo", $form.find('input[name="LogoToken"]').val());
    data.append("address", $form.find('input[name="Address"]').val());
    data.append("name", $form.find('input[name="Name"]').val());
    data.append("id", _serverId);

    if (serverLogoUploadFile !== null) {
      data.append('file', serverLogoUploadFile);
    }

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/server/PutAjax',
      processData: false,
      contentType: false,
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Проекты
   */
  $(document).on('click', '[data-target="#editProject"]', function() {
    var id = $(this).data("id");
    loadProject(id);
  });

  $editProject.on('show.bs.modal', function(e) {
    var $button = $(e.relatedTarget);
    var $modal = $(this);
    var $row = $button.closest('tr');
    var $title = $row.find('td:first-child').text();

    $modal.find('.modal-title').text($title);
  })
  .on('submit', 'form', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      name: $form.find('input[name="Name"]').val(),
      notes: $form.find('input[name="Notes"]').val(),
      location: $form.find('input[name="Location"]').val(),
      locationEn: $form.find('input[name="LocationEn"]').val(),
      locationNl: $form.find('input[name="LocationNl"]').val(),
      locationFr: $form.find('input[name="LocationFr"]').val(),
      icon: $form.find('input[name="Icon"]').val(),
      id: _projectId
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/project/PutAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Добавление проекта
   */
  $('#panelProject').on('submit', 'form', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      name: $form.find('input[name="Name"]').val(),
      notes: $form.find('input[name="Notes"]').val(),
      location: $form.find('input[name="Location"]').val(),
      locationEn: $form.find('input[name="LocationEn"]').val(),
      locationNl: $form.find('input[name="LocationNl"]').val(),
      locationFr: $form.find('input[name="LocationFr"]').val(),
      icon: $form.find('input[name="Icon"]').val()
    };

    $preloader.removeClass('d-none');

    $.ajax({
      url: '/project/CreateAjax',
      type: 'post',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Добавление сигналов в проект
   */
  $projectAddSignal.on('show.bs.modal', function(e) {
    var $id = $(this).data('id');
    loadProjectSignal($id);
  })
  .on('hidden.bs.modal', function(e) {
    updateTable($projectAddSignalTable, $('#projectAddSignals'));
  })
  .on('submit', 'form', function(e) {
    e.preventDefault();

    var ids = [];
    var $form = $(this);
    var $error = $form.find('.help-block');

    $form.find('table tbody [type="checkbox"]:checked').each(function() {
      var val = $(this).attr('id');
      ids.push({Id: val});
    });

    var data = {
      id: _projectAddSignalId,
      Items: ids
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/ProjectDetails/AddSignalPutAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Добавление пользователей в проект
   */
  $projectAddUser.on('show.bs.modal', function(e) {
    var $id = $(this).data('id');
    loadProjectUser($id);
  })
  .on('hidden.bs.modal', function(e) {
    updateTable($projectAddUserTable, $('#projectAddUsers'));
  })
  .on('submit', 'form', function(e) {
    e.preventDefault();

    var ids = [];
    var $form = $(this);
    var $error = $form.find('.help-block');

    $form.find('table tbody [type="checkbox"]:checked').each(function() {
      var val = $(this).attr('id');
      ids.push({Id: val});
    });

    var data = {
      id: _projectAddUserId,
      Items: ids
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/ProjectDetails/AddUserPutAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Сигналы
   */
  $('#signals').on('click', '.js-btn-edit', function() {
    var id = $(this).data("id");
    loadSignal(id);
  });

  $editSignal.on('show.bs.modal', function(e) {
  })
  .on('submit', 'form', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      location: $form.find('input[name="Location"]').val(),
      locationEn: $form.find('input[name="LocationEn"]').val(),
      locationNl: $form.find('input[name="LocationNl"]').val(),
      locationFr: $form.find('input[name="LocationFr"]').val(),
      name: $form.find('input[name="Name"]').val(),
      nameEn: $form.find('input[name="NameEn"]').val(),
      nameNl: $form.find('input[name="NameNl"]').val(),
      nameFr: $form.find('input[name="NameFr"]').val(),
      id: _signalId
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/signal/PutSignalAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Сигналы - типы
   */
  $('#signalsTypes').on('click', '.js-btn-edit', function() {
    var id = $(this).data("id");
    loadSignalType(id);
  });

  $editSignalType.on('submit', 'form', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      message: $form.find('input[name="Message"]').val(),
      messageEn: $form.find('input[name="MessageEn"]').val(),
      messageNl: $form.find('input[name="MessageNl"]').val(),
      messageFr: $form.find('input[name="MessageFr"]').val(),
      id: _signalTypeId
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/signal/PutNotificationTypeAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Пользователи
   */
  $(document).on('click', '[data-target="#editUsers"]', function() {
    var id = $(this).data("id");
    loadUser(id);
  });

  $editUser.on('submit', 'form', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      name: $form.find('input[name="name"]').val(),
      email: $form.find('input[name="Email"]').val(),
      phone: $form.find('input[name="Phone"]').val(),
      id: _userId
    };

    $preloader.removeClass('d-none');

    $.ajax({
      type: 'PUT',
      url: '/user/PutAjax',
      data: data
    })
    .done(function(result) {
      doneResult(result, $error);
    })
    .always(function() {
      $preloader.addClass('d-none');
    });
  });

  /**
   * Удаление строки таблицы
   */
  $('.js-modal-delete').on('show.bs.modal', function(e) {
    var $button = $(e.relatedTarget);
    var $title = $button.closest('tr').find('td:first-child').text();
    var $modal = $(this);

    $modal.attr('data-id', $button.data('id'));
    $modal.find('.title-confirm').text($title);
  })
  .on('click', '.js-btn-delete', function() {
    var $modal = $(this).closest('.modal');
    var $agree = $modal.find('#agree');

    var stateRemove = function() {
      $modal.addClass('is-remove-wait');
      $modal.modal('hide');
    };

    if ($agree.length > 0) {
      if ($agree.prop('checked')) {
        stateRemove();
      } else {
        $agree.focus();
      }
    } else {
      stateRemove();
    }
  })
  .on('hide.bs.modal', function(e) {
    var $modal = $(this);
    var $id = $(this).data('id');

    if ($modal.hasClass('is-remove-wait')) {
      switch ($modal.attr('id')) {
        case 'deleteProject':
          getDelete($id, "/Project/DeleteAjax");
          break;
        case 'deleteProjectSignal':
          getDelete($id, "/ProjectDetails/DeleteSignalAjax");
          break;
        case 'deleteProjectUser':
          getDelete($id, "/ProjectDetails/DeleteUserAjax");
          break;
        case 'deleteSignal':
          getDelete($id, "/Signal/DeleteAjax");
          break;
        case 'deleteUser':
          getDelete($id, "/User/DeleteAjax");
          break;
        default:
          break;
      }

      $modal.removeClass('is-remove-wait');
    }
  });

  function wb(workbook) {
    var result = [];

    workbook.SheetNames.forEach(function(sheetName) {
      var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
      if (csv.length) {
        result.push(csv);
      }
    });
    return result.join("\n");
  }

  function createTableImportUsers(data) {
    var $rows = '';

    for (var row = 0; row < data.length - 1; row++) {
      var tableRow = data[row].split(",");

      if (row > 0) {
        $rows += '<tr class="row-user">';

        for (var i = 0; i < tableRow.length; i++) {
          $rows += '<td class="align-middle">' +
                   '<input class="form-control form-control-sm"' +
                   'type="text" name="#" value="' + tableRow[i] +
                   '" readonly="" /></td>';
        }
        $rows += '<td class="align-middle"><button class="btn btn-action ' +
                 'btn-danger-light text-danger js-btn-remove" ' +
                 'type="button" data-target="deleteUser" ' +
                 'data-toggle="modal" data-placement="top" title="" ' +
                 'data-btn-action="data-btn-action" data-id="" ' +
                 'data-original-title="Delete"><i class="material-icons">' +
                 'delete</i></button></td></tr>';
      }
    }
    $addAppUsersTable.rows.add($($rows)).draw();
  }

  $('#uploadUsers').change(function(e) {
    var ext = $(this).val().split(".").pop().toLowerCase();

    if (e.target.files !== undefined) {
      var reader = new FileReader();

      if ($.inArray(ext, ["csv"]) === -1) {
        reader.readAsArrayBuffer(e.target.files[0]);
      } else {
        reader.readAsText(e.target.files.item(0));
      }

      reader.onload = function(e) {
        var csvData = e.target.result;

        if ($.inArray(ext, ["csv"]) === -1) {
          var data = new Uint8Array(e.target.result);
          csvData = wb(XLSX.read(data, {type: 'array'}));
        }

        csvData = csvData.split(/\r?\n|\r/);

        createTableImportUsers(csvData);
      };
    }
  });

  $('#addAppUsersForm').on('change', 'tfoot input', function() {
    var $this = $(this);
    var $table = $this.closest(".table");
    var $row = $this.closest('tr');

    $row.find('input').removeClass('is-edit');

    if ($this.closest('td').index() === 2) {
      $this.closest('tr').find('td:first-child input').addClass('is-edit');
    } else {
      $this.closest('td').next().find('input').addClass('is-edit');
    }

    $table.find('tbody input.is-edit').each(function() {
      $(this).removeClass('is-edit');
    });

    $addAppUsersTable.row.add($($row.clone())).draw(false);

    $table.find('tbody input[name="name"]').attr('required', true);
    $table.find('tbody input[name="email"]').attr('required', true);
    // $table.find('tbody input[name="phone"]').attr('required', true);

    $table.find('tbody input.is-edit').focus();

    $row.find('input').val('');
  })
  .on('click', '.js-btn-remove', function() {
    var $state = $(this).closest('tr');

    if ($state.hasClass('is-wait-edit') === false &&
        $state.hasClass('is-wait-delete') === false
      ) {
      $(this).tooltip('hide');
      $addAppUsersTable.row($state).remove().draw();
    }
    $state.addClass('is-wait-delete');

    setTimeout(function() {
      $state.removeClass('is-wait-delete');
    }, 300);
  })
  .on('submit', function(e) {
    e.preventDefault();

    var errors = false;
    var $form = $(this);
    var $error = $form.find('.help-block');

    var data = {
      Items: []
    };

    $.each($addAppUsersTable.rows().nodes().to$(), function() {
      var $row = $(this).find('td');

      data.Items.push({
        Name: $row.eq(0).find('input').val(),
        Email: $row.eq(1).find('input').val(),
        Phone: $row.eq(2).find('input').val()
      });
    });

    if (!errors) {
      $preloader.removeClass('d-none');

      $.ajax({
        url: '/User/CreateAjax',
        type: 'post',
        data: data
      })
      .done(function(result) {
        if (result.Errors !== null) {
          $error.html('');

          $(result.Errors).each(function() {
            $error.append('<p>' + this + '</p>');
          });
          $error.show();
        } else {
          $error.hide();

          window.location.reload();
        }
        // doneResult(result, $error);
      })
      .always(function() {
        // $preloader.addClass('d-none');
      });
    }
  });

  $(document).on('show.bs.modal', '.modal', function(event) {
    var zIndex = 1050 + (10 * $('.modal:visible').length);

    $(this).css('z-index', zIndex);

    setTimeout(function() {
      $('.modal-backdrop').not('.modal-stack')
      .css('z-index', zIndex - 1)
      .addClass('modal-stack');
    }, 100);
  });

  function dropzone() {
    var $serverLogo = $('#uploadLogo');

    if ($serverLogo.length > 0) {
      serverLogoUpload = $serverLogo.dropzone({
        previewsContainer: ".dropzone",
        filesizeBase: 1000,
        url: '#',
        acceptedFiles: ".jpg,.jpeg,.png",

        init: function() {
          // Using a closure.
          var _this = this;
          var $logo = $('#userLogo');
          var $feedback = $logo.attr('src');

          _this.on("sending", function(file) {
            var btnClear = '<button class="dz-clear btn" type="button">' +
                           '<i class="ion-android-close"></i></button>';
            $('.dz-preview').append(btnClear);
          });

          // Setup the observer for the button.
          $(document).on("click", '.dz-clear', function() {
            // Using "_this" here, because "this" doesn't point to the dropzone anymore
            _this.removeAllFiles();

            $logo.attr('src', $feedback);
          });

          _this.on("addedfile", function(file) {
            serverLogoUploadFile = file;

            var ext = file.name.split('.')[1];

            if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
              this.removeAllFiles();
              $editServer.find('form .help-block').html('File type not allowed');
            } else {
              $editServer.find('form .help-block').html('');
            }
          });
        },

        uploadprogress: function(file, progress, bytesSent) {
        },
        sending: function(file, xhr, formData) {
          var $error = $editServer.find('form .help-block');

          $preloader.removeClass('d-none');

          $.ajax({
            type: "POST",
            url: "/Server/UploadImageAjax",
            data: formData.append("Id", "502345bb-4e16-47f8-b125-5243b7d02f52"),
            async: false,
            cache: false,
            contentType: false,
            processData: false
          }).done(function(result) {
            doneResult(result, $error, true);
          })
          .always(function() {
            $preloader.addClass('d-none');
          });
        }
      });
    }
  }
  dropzone();
})(jQuery);
