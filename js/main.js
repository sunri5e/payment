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

    cardNum = cardNum.length > 0 ? cardNum: false;
    inputVals['c_num'] =  {
        value: cardNum,
        required: true,
        len:16,
        valid : (cardNum !== false && cardNum.length === 16) ? Boolean(1) : Boolean(0)};

    var plan;
    $('input[name=\'plan\']').each(function () {
        if ($(this).prop('checked')) {
            return plan = $(this).val();
        }
    });
    inputVals['plan'] = {
        value: plan,
        required: false,
        len:0,
        valid:true};

    var method = '';
    $('input[name=\'method\']').each(function () {
        if ($(this).prop('checked')) {
            return method = $(this).val();
        }
    });

    method = method.length > 0 ? method: false;

    inputVals['method'] = {
        value: method,
        required: true,
        len:1,
        valid : (method !== false && method.length > 1) ? Boolean(1) : Boolean(0)};

    $('input:not([type=submit]), select').each(function () {
        if (!$(this).attr('name').match(/(method|plan|c_num)/)) {
            var $this = $(this),
                valName = $this.attr('name'),
                objValLen = $this.val().length,
                value = $this.attr('type') === 'checkbox' ? ($this.is(':checked') ? 'off' : 'on') : (objValLen > 0 ? $this.val(): false),
                required = $this.hasClass( "required" ),
                label = $this.closest('label'),
                minLength = $this.attr('data-minlen') || false,
                valid = !required ? true: (
                    (minLength && objValLen < minLength) ? Boolean(0) : Boolean(1)
                );


            inputVals[valName] = {
                value : value,
                required: required,
                len:minLength,
                valid:valid
            };
        }
    });

    console.log(inputVals);

    for (i in inputVals) {
        var label = $('label[for="' + i + '"]');
        if (inputVals[i]['required'] && inputVals[i]['valid'] === false) {
            if (i.match(/(method|terms)/)) {
                $('.'+i).css('color','red');
            }
                $('input, select', label).css('border-color','red');

        } else {
            if (i.match(/(method|terms)/)) {
                $('.'+i).removeProp( "style" );
            }
                $('input, select', label).removeProp( "style" );
        }
    }


});