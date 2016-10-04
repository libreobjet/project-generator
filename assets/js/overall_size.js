/**
Overall size editable input.
Internally value stored as {length: 100, width: 100, heigth: 100}

@class overall_size
@extends abstractinput
@final
@example
<a href="#" id="overall_size" data-type="overall_size" data-pk="1">100 x 100 x 100 mm</a>
<script>
$(function(){
    $('#overall_size').editable({
        url: '/post',
        title: 'Enter outbound box of the object #',
        value: {
            length: 100,
            width: 100,
            height: 100
        }
    });
});
</script>
**/
(function ($) {
    "use strict";

    var OverallSize = function (options) {
        this.init('overall_size', options, OverallSize.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(OverallSize, $.fn.editabletypes.abstractinput);

    $.extend(OverallSize.prototype, {
        /**
        Renders input from tpl

        @method render()
        **/
        render: function() {
           this.$input = this.$tpl.find('input');
        },

        /**
        Default method to show value in element. Can be overwritten by display option.

        @method value2html(value, element)
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return;
            }
            var html = $('<div>').text(value.length).html() + ' x ' + $('<div>').text(value.width).html() + ' x ' + $('<div>').text(value.height).html() + ' mm';
            $(element).html(html);
        },

        /**
        Gets value from element's html

        @method html2value(html)
        **/
        html2value: function(html) {
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g.
            editable({
                value: {
                    city: "Moscow",
                    street: "Lenina",
                    building: "15"
                }
            });
          */
          return null;
        },

       /**
        Converts value to string.
        It is used in internal comparing (not for sending to server).

        @method value2str(value)
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';
               }
           }
           return str;
       },

       /*
        Converts string to value. Used for reading value from 'data-value' attribute.

        @method str2value(str)
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute.
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },

       /**
        Sets value of input.

        @method value2input(value)
        @param {mixed} value
       **/
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="length"]').val(value.length);
           this.$input.filter('[name="width"]').val(value.width);
           this.$input.filter('[name="height"]').val(value.height);
       },

       /**
        Returns value of input.

        @method input2value()
       **/
       input2value: function() {
           return {
              length: this.$input.filter('[name="length"]').val(),
              width: this.$input.filter('[name="width"]').val(),
              height: this.$input.filter('[name="height"]').val()
           };
       },

        /**
        Activates input: sets focus on the first field.
        OverallSizeOverallSize
        @method activate()
       **/
       activate: function() {
            this.$input.filter('[name="length"]').focus();
       },

       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode

        @method autosubmit()
       **/
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }
    });

    OverallSize.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-overall-size"><label><span>Length: </span><input type="number" name="length" class="input-small"></label></div>'+
             '<div class="editable-overall-size"><label><span>Width: </span><input type="number" name="width" class="input-small"></label></div>'+
             '<div class="editable-overall-size"><label><span>Height: </span><input type="number" name="height" class="input-mini"></label></div>',

        inputclass: ''
    });

    $.fn.editabletypes.overall_size = OverallSize;

}(window.jQuery));
