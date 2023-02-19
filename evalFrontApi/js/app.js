$(document).ready(() => {
    const apiBaseUrl = "http://localhost:3000";
    //getAllList on affiche toute la liste dès le chargement de la page
    getAllList();
    function getAllList(){
        $.ajax({
            type: "GET",
            url: apiBaseUrl + '/list',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (result) => {
                console.log(result);
                let codeList = "";
                for(let i=0; i<result.length; i++){
                    codeList += `<li>${result[i].id} ${result[i].name}</li>`
                }
                $('#shoppingList').html(codeList);    
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: "+status+" error: "+error)
            }
        })
    }

    function createElement(){
        const elementName = {name: $("#addElement").val()};
        $.ajax({
            type: "POST",
            url: apiBaseUrl + '/list',
            data: JSON.stringify(elementName),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (result) => {
                console.log(result);
                getAllList();
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: "+status+" error: "+error)
            }
        })
    }

    function deleteElement (){
        const id = $("#deleteElement").val();
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + '/list/'+id,
            data: JSON.stringify(),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (result) => {
                console.log(result);
                getAllList();
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: "+status+" error: "+error)
            }
        })
    }

    function updateElement (){
        const id = $("#updateElement").val();
        const name = {name:$('#update').val()}
        $.ajax({
            type: "PUT",
            url: apiBaseUrl + '/list/'+id,
            data: JSON.stringify(name),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (result) => {
                console.log(result);
                getAllList();
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: "+status+" error: "+error)
            }
        })
    }

   

    $('#addList').click(createElement)
    $('#deleteList').click(deleteElement)
    $('#updateList').click(updateElement)
})