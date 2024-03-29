const $ = (id) => document.getElementById(id);

window.addEventListener('load', function () {
    const search = $('search');

    $('formSearch').addEventListener('submit', function (e) {
        e.preventDefault();

        let error = false;

        if (search.value.trim() === '') {
            error = true;
        }

        !error && this.submit();
    });

    $('email').addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('msgError-email').innerHTML = 'Email obligatorio';
                this.classList.add('is-invalid');
                break;
            case !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value):
                $('msgError-email').innerHTML = 'Email invalido';
                this.classList.add('is-invalid');
                break;
            default:
                $('msgError-email').innerHTML = null;
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                break;
        }
    });

    $('email').addEventListener('change', async function () {
        try {
            const response = await fetch(
                `/api/check-email?email=${this.value}`
            );
            const result = await response.json();

            if (!result.data) {
                $('msgError-email').innerHTML = 'Este email no esta registrado';
                this.classList.add('is-invalid');
            }
        } catch (error) {
            console.error();
        }
    });

    $('password').addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('msgError-password').innerHTML = 'Contraseña obligatoria';
                this.classList.add('is-invalid');
                break;
            case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(this.value):
                $('msgError-password').innerHTML =
                    'Recuerde ingresar al menos un número, una mayúscula y un caracter especial';
                this.classList.add('is-invalid');
                break;
            default:
                $('msgError-password').innerHTML = null;
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                break;
        }
    });

    $('formAdd').addEventListener('submit', function (e) {
        e.preventDefault();

        const elementsForm = $('formAdd').elements;
        let error = false;

        for (let i = 0; i < elementsForm.length - 1; i++) {
            if (
                !elementsForm[i].value.trim() ||
                elementsForm[i].classList.contains('is-invalid')
            ) {
                elementsForm[i].classList.add('is-invalid');
                $('msgError-empty').innerHTML =
                    'Los campos señalados son obligatorios';
                error = true;
            }
        }

        !error && this.submit();
    });
});
