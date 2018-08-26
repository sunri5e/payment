$(document).on('click', '.field-group__input_file-logo', function () {
    var target = $(this).attr('data-target');
    $('#' + target).click();
});

$(document).on('input', 'input[type=tel], .num-only', function () {
    $(this).val($(this).val().replace(/\D/g, ''));
});

$(document).on('input', 'input[name=expire]', function () {
    var exp = $(this).val().replace(/\D/g, '');
    for (var i = 2; i < exp.length; i = i + 2) {
        exp = [exp.slice(0, i), "/", exp.slice(i)].join('');
        i++;
    }
    $(this).val(exp);


});

$(document).on('submit', '#paymentForm', function (e) {
    e.preventDefault();

    var inputVals = [];

    var cardNum = '';
    $('input[name*=\'c_num\']').each(function () {
        cardNum += $(this).val();
    });
    inputVals['card_number'] = [
        {'value': cardNum,
            'required': true}
    ];

    var plan;
    $('input[name=\'plan\']').each(function () {
        if ($(this).prop('checked')) {
            return plan = $(this).val();
        }
    });
    inputVals['plan'] = [
        {'value': plan,
            'required': true,
            'text':'Choose plan'}
    ];

    var method = '';
    $('input[name=\'method\']').each(function () {
        if ($(this).prop('checked')) {
            return method = $(this).val();
        }
    });

    inputVals['method'] = [
        {'value': method,
            'required': true,
            'text':'Choose pay method'}
    ];

    $('input:not([type=submit])').each(function () {
        if (!$(this).attr('name').match(/(method|plan|c_num)/)) {
            var valName = $(this).attr('name'),
                value = $(this).val(),
                required = $(this).hasClass( "required" ),
                label = $(this).closest('label'),
                text = label.find('small').text();

            inputVals[valName] = [
                {'value': value,
                    'required': required,
                    'text':text}
            ];
        }
    });

    console.log(inputVals);

    // for (i in inputVals) {
    //     console.log(inputVals[i][0]['value']);
    // }


});