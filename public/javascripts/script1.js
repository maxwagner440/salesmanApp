$(document).ready(function () {
var rs =''

    $("#btn-main-one").click(function () {
        $(".flexer").show();
        $(".flexer3").hide()
        $('.flexer2').css({ 'display': 'none' })
    });

    $("#btn-main-two").click(function () {
        $(".flexer").hide();
        $(".flexer2").show();
        $('.flexer2').css({ 'display': 'flex' })
        $(".flexer3").hide();

    });

    $(".btnCustAlter").click(function () {
        $(".flexer").hide();
        $(".flexer2").hide();
        $(".flexer3").show();

    });


    $(document).on('click', '.btn-list', function (data) {
        var custName = $(this).text();

        $.get('/api/getInvidualCust', { parm1: custName },
            function (returnedData) {
                var customerName = returnedData[0].cust_name;
                var customerNumber = returnedData[0].cust_phone;
                var customerEmail = returnedData[0].cust_email;
                rs = returnedData[0].rs;
                var custItem = document.createElement('div');
                custItem.classList.add('customer-modal-info')
                custItem.innerHTML = '<div class="modal-cust-name">' + customerName + '</div>' +
                    '<div class="modal-cust-number">' + customerNumber + '</div>' + '<div class="modal-cust-email">' + customerEmail + '</div>'
                    + '<div><button id="edit-cust">Edit Customer</button></div>';
                document.getElementsByClassName('modal-content')[0].appendChild(custItem);


            });

        var modal = document.getElementById('myModal');
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        modal.style.display = "block";
        if (event.target == modal) {
            modal.style.display = "none";
        }

    });


    $(document).on('click', '.close', function (data) {
        var modal = document.getElementById('myModal');
        var currentHTML = document.getElementsByClassName('customer-modal-info')
        var fc = currentHTML.firstChild;
        while(fc){
            currentHTML.removeChild( fc );
            fc = currentHTML.firstChild;
        }
        $('.customer-modal-info').empty()
        modal.style.display = "none";
    })


    $(".btnC").click(function () {
        //alert("buttonC")
        $.get("/api/custData", function (data) {
            makeUL(data);
        });
    });

   


    $(document).on('click', '#edit-cust', function (data) {
        var name = $('.modal-cust-name').text()
        var email =  $('.modal-cust-email').text()
        var number =  $('.modal-cust-number').text()

        $('.customer-modal-info').hide()

        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('name','custAdjust')
        f.setAttribute('action',"/api/adjustCust");
        
        var hide = document.createElement("input"); //input element, text
        hide.setAttribute('type',"hidden");
        hide.setAttribute('name',"rs");
        hide.setAttribute('value', rs)

        var na = document.createElement("input"); //input element, text
        na.setAttribute('type',"text");
        na.setAttribute('name',"adjustName");
        na.setAttribute('value', name)

        var nu = document.createElement("input"); //input element, text
        nu.setAttribute('type',"tel");
        nu.setAttribute('name',"adjustNumber");
        nu.setAttribute('value',number);
        
        var em = document.createElement("input"); //input element, text
        em.setAttribute('type',"text");
        em.setAttribute('name',"adjustEmail");
        em.setAttribute('value',email);
        
        
        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Submit");
        s.setAttribute('onclick', 'return updateCustomer()')
        
        f.appendChild(hide);
        f.appendChild(na);
        f.appendChild(nu);
        f.appendChild(em);        
        f.appendChild(s);
    
        document.querySelector(".modal-adjust-form").appendChild(f);

       /*  $.get('/api/adjustCust', { parm1: name, parm2: number, parm3: email },
        function (returnedData) {
            console.log(returnedData);
        }) */ 
    })




    function makeUL(data) {
        if ($(".cuList").length) {
            $(".customer-list").slideToggle();

        }
        else {
            var listContainer = document.createElement('div');
            listContainer.classList.add("cuList");
            // Add it to the page
            document.getElementsByClassName('customer-list')[0].appendChild(listContainer);

            // Make the list
            var listElement = document.createElement('ul');

            // Add it to the page
            listContainer.appendChild(listElement);

            // Set up a loop that goes through the items in listItems one at a time
            var numberOfListItems = data.length;

            //Sort name by alphabetical order
            data.sort(function (a, b) {
                if (a.cust_name < b.cust_name)
                    return -1;
                if (a.cust_name > b.cust_name)
                    return 1;
                return 0;
            });
            
            for (var i = 0; i < numberOfListItems; ++i) {
                // create an item for each one
                var listItem = document.createElement('div');
                //var div = document.createElement('div');

                listItem.classList.add('btn-list')

                // Add the item text
                listItem.innerHTML = '<div class="js-cust-list">' + data[i].cust_name + '</div>';

                // Add listItem to the listElement
                // listElement.appendChild(div);
                listElement.appendChild(listItem);
            }
        }

    }


   
})


 