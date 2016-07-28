
class Myitems {
  getMyItems() {
    var user = localStorage.getItem('loggeduser');
    var dataString = 'user='+ user;
    $.ajax({
        url:"http://maddna.xyz/myitems.php",
        type:"POST",
        data: dataString,
        cache: false,
        success: function(data){
            var x = data;
            text = "<div class='list-block'>";
            for(i = 0;i < x.length;i++){
                var imageLink = 'http://maddna.xyz/'+x[i].image_src;
                text += "<ul>
                          <li class='item-content'>
                              <div class='item'media' style='position:relative;overflow:hidden;height:110px;width:100px;background-color:grey;'>
                                  <a href='#' onclick='myaction(\""+x[i].item_name+"\")'><img src="+imageLink+" style='overflow:hidden;height:auto;width:100%;'>
                              </div>
                              <div class='item-inner'>
                                <div class='item-title' style='margin:0 0 40px 10px;'>"+x[i].item_name+"</a>
                              <div class='item-after'>"+x[i].description+"
                              </div>
                              </li>
                          </ul>";
            }
            text += "</div>";
            document.getElementById("myitemsDiv").innerHTML = text;
        }
    });
  }

  actions() {
    var buttons = [
      {
        text: 'Remove',
        onClick: function () {
          myApp.confirm('Your item will be deleted',function() {
            var dataString = 'name='+itemname;
            $.ajax({
              url:"http://maddna.xyz/dismiss.php",
              type:"POST",
              data: dataString,
              cache: false,
              success: function(data) {
                if(data == 1){
                myApp.alert('Successfully deleted item', 'Womble')
                location.reload();
              }
              else {
                myApp.alert('Error deleting item', 'Womble')
              }
            },
            error: function() {
              myApp.alert('Error deleting item', 'Womble')
            }
          });
        })
      }
    },
    {
      text: 'Cancel',
      color: 'red',
    },
  ];
  myApp.actions(buttons);
};

  }
}
