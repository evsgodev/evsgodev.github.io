// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.getElementsByClassName('needs-validation');
const $uploadPhoto = $('#uploadPhoto');

// Loop over them and prevent submission
Array.prototype.filter.call(forms, function(form) {
  form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});

if ($uploadPhoto.length > 0) {
  $uploadPhoto.dropzone({
    url: '#',
    filesizeBase: 2000,
    previewTemplate: '<div class="dz-preview d-none"></div>',
    init: function() {
      // Using a closure.
      const _this = this;
      const $target = $('#personPhoto');
      const $feedback = $target.attr('src');
      // const clear = `<button class="dz-clear btn" type="button">
      //                 <i class="icon icon-close"></i>
      //               </button>`;

      _this.on('sending', function(file) {
        // $('.dz-preview').remove(clear);
      });

      // Setup the observer for the button.
      $(document).on('click', '.dz-clear', function() {
        // Using '_this' here, because 'this' doesn't point to the dropzone anymore
        _this.removeAllFiles();

        $target.attr('src', $feedback);
      });

      _this.on('thumbnail', function(file, dataUrl) {
        $target.attr('src', file.dataURL);
      });

      _this.on('addedfile', function(file) {
        console.log(file);
      });
    },

    uploadprogress: function(file, progress, bytesSent) {
    },
    sending: function(file, xhr, formData) {
      $.ajax({
        type: 'POST',
        url: '#',
        data: formData.append('Id', ''),
        async: false,
        cache: false,
        contentType: false,
        processData: false
      })
      .done(function(result) {
      })
      .always(function() {
      });
    }
  });
}

$('#numberPhone').mask('+7(000)000-00-00');
$('#mailIndex').mask('000000');

// Логин
$('#formLogin').on('submit', function(e) {
  e.preventDefault();

  const data = [];

  if (e.target.checkValidity()) {
    $.ajax({
      type: 'POST',
      url: '#',
      data: data
    }).done(function() {

    });
    document.location = 'index-login.html';
  }
});

// Восстановление пароля
$('#formRestore').on('submit', function(e) {
  e.preventDefault();

  const data = [];

  if (e.target.checkValidity()) {
    $.ajax({
      type: 'POST',
      url: '#',
      data: data
    }).done(function() {

    });

    $('#modalRestore').modal('hide');
  }
});

// Регистрация
$('#formRegist').on('submit', function(e) {
  e.preventDefault();

  const data = [];

  if (e.target.checkValidity()) {
    $.ajax({
      type: 'POST',
      url: '#',
      data: data
    }).done(function() {
      document.location = 'registration-success.html';
    });
  }
});

// Редактирование аккаунта
$('#formAccount').on('submit', function(e) {
  e.preventDefault();

  const data = [];

  if (e.target.checkValidity()) {
    $.ajax({
      type: 'POST',
      url: '#',
      data: data
    }).done(function() {
    });
  }
});
