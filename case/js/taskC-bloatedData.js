(function () {

    var datePicker = window.datePicker;

    var monthData;
    var $wrap;

    datePicker.buildUi = function (year, month) {
        monthData = datePicker.getMonthData(year, month);
        var html = '<div class="datepicker-header">' +
                        '<a href="#" class="datepicker-btn datepicker-prev">&lt;</a>' +
                        '<a href="#" class="datepicker-btn datepicker-next">&gt;</a>' +
                        '<span class="datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>' +
                   '</div>' +
                   '<div class="datepicker-body">' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>Mon</th>' +
                                    '<th>Tue</th>' +
                                    '<th>Wed</th>' +
                                    '<th>Thi</th>' +
                                    '<th>Fri</th>' +
                                    '<th>Sat</th>' +
                                    '<th>Sun</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>';

                                for (var i = 0; i < monthData.days.length; i++) {
                                    var date = monthData.days[i];
                                    if (i % 7 === 0) {
                                        html += '<tr>';
                                    }
                                    html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';
                                    if (i % 7 === 6) {
                                        html += '</tr>';
                                    }
                                }

                            html+='</tbody>' +
                        '</table>'+
                    '</div>';
        return html;
    };

    datePicker.render = function (direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        var html = datePicker.buildUi(year,month);

        $wrap=document.querySelector('.datepicker-wrap');

        if(!$wrap){
            $wrap = document.createElement('div');
            $wrap.className = 'datepicker-wrap';
        }

        $wrap.innerHTML = html;

        document.body.appendChild($wrap);

    };

    datePicker.init = function (input) {
        datePicker.render();

        var $input=document.querySelector(input);
        var isOpen=false;

        $input.addEventListener('click',function(){
            if(isOpen){
                $wrap.classList.remove('datepicker-wrap-show');
                isOpen=false;
            }else{
                $wrap.classList.add('datepicker-wrap-show');

                var left=$input.offsetLeft;
                var top=$input.offsetTop;
                var height=$input.offsetHeight;

                $wrap.style.top=top+height+2+'px';
                $wrap.style.left=left+'px';

                isOpen=true;
            }
        },false);

        $wrap.addEventListener('click',function(e){
            var $target=e.target;

            if(!$target.classList.contains('datepicker-btn')){
                return false;
            }

            //上一月,下一月
            if($target.classList.contains('datepicker-prev')){
                datePicker.render('prev');
            }else if($target.classList.contains('datepicker-next')){
                datePicker.render('next');
            }
        },false);

        $wrap.addEventListener('click',function(e){
            var $target= e.target;

            if($target.tagName.toLocaleLowerCase()!=='td'){
                return false;
            }

            var date=new Date(monthData.year,monthData.month-1,$target.dataset.date);

            $input.value=format(date);

            $wrap.classList.remove('datepicker-wrap-show');
            isOpen=false;

        },false);
    };

    function format(date){
        var ret='';

        var padding=function(num){
            if(num<=9){
                return '0'+num;
            }
            return num;
        };

        ret+=date.getFullYear()+'-';
        ret+=padding(date.getMonth()+1)+'-';
        ret+=padding(date.getDate());

        return ret;
    }

})();