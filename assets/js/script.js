{
    let form = $('#url-form');
    form.submit((event)=>{
        event.preventDefault();
        let formData = form.serialize();
        console.log(formData);
        $.ajax({
            url : '/short-url',
            method : 'post',
            data : formData,
            success : function(data){
                $('#url-tracker>table').append(UrlHtml(data.data.url));
            },
            error : function(err){
                console.log(err);
            }
        });
    });

    let UrlHtml = function(urlContent){
        console.log(urlContent);
        return (`<tr>
        <td>
            <a href = "${urlContent.url}">${urlContent.url}</a>
        </td>
        <td><a href = "/u/${urlContent.short_url}">${urlContent.short_url}</a></td>
        <td>${urlContent.click}</td>
    </tr>`);
    }
}