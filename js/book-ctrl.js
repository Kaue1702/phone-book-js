$('#formContact').submit(function () {
    addContact();
    return false;
});

async function addContact() {

    try {
        let end = await consultaCep($('#form-zipcode').val());
        let contact = `<tr>
                     <td>` + $('#form-name').val() + `</td>
                     <td>`+ $('#form-phone').val() + `</td>
                     <td>`+ $('#form-zipcode').val() + `</td>
                     <td> `+ end.logradouro + ` - ` + end.bairro + ` - ` + end.localidade + `</td>
                     <td><button type="button" class="btn btn-danger btn-sm btn-delete">x</button></td>
                   </tr>`;
        $('#list-contacts tbody').append(contact);
    } catch (error) {
        alert('CEP inválido!');
    }
}

$(document).on('click', '.btn-delete', function () {
    $(this).parent().parent().remove();
});

async function consultaCep(cep) {
    return await $.ajax({
        url: "https://viacep.com.br/ws/" + cep + "/json/",
        dataType: "json",
        success: function (data) {
            return data;
        }
    });
}