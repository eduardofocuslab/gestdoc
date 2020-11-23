window.addEventListener('load', function () {
    console.log(gestdocRequest)//remplazar por llamada AJAX a futuro, por ahora no por que tendras error de cors

    document.getElementById("search").addEventListener("keyup", function () {
        var htmlBody = ''
        if (this.value.length >= 3) {
            document.getElementById('block-list').innerHTML = ''
            var justFound = findWords(this.value, gestdocRequest)
            htmlBody = htmlList(justFound);
            $(".section__search__results").addClass("section__search__results--show");
        }
        else{
            $(".section__search__results").removeClass("section__search__results--show");
            $(".section__search").removeClass("section__search--openinfo")
        }
    });
})

function displayNews(section) {
    var element = document.createElement('div');
    var element_tag = document.createElement('div');
    var element_name = document.createElement('div');
    var element_link = document.createElement('a');

    element.classList.add("section__search__result");
    element_tag.classList.add("section__search__tag");
    element_name.classList.add("section__search__name");
    element.onclick = function () {
        selectedItem(section);
    };
    element_link.innerHTML = section._nameSchema
    /*element_link.href= section._link; */
   /* element_link.target= "_blank"; */
    element_tag.innerHTML = section._category
    element_tag.innerHTML = section._category

    element.appendChild(element_name);
    element.appendChild(element_tag);
    element_name.appendChild(element_link);
    document.getElementById("block-list").appendChild(element);
}

function selectedItem(item) {
    /*alert('categoria:' + item._category)*/
    $(".section__info__items").empty();
    $(".section__search").addClass("section__search--openinfo")
    $(".section__search__box .section__info__tag").text(item._category)
    $(".section__search__box .section__info__name").text(item._nameSchema)
    $(".section__search__box .section__info__description").text(item._description)
    $(".section__search__box .section__info__link a").attr("href", item._link)


    item._requirements.forEach( function(value, index, array) {
        var element_req = document.createElement('div');
        element_req.classList.add("section__info__item");
        element_req.innerHTML = value
        document.getElementById("info-list").appendChild(element_req);
    });


}

const htmlList = list => {
    // Si hay resultados los agrego a los resultados y boro div con documentos no encontrados
    if(list.length > 0){
        $(".section__search__results__notfound").removeClass("section__search__results__notfound--show");
        for (let i = 0; i < list.length; i++) {
            displayNews(list[i])
        }
    }
    // Si no hay resultados activo div con documentos no encontrados
    else{
        
        $(".section__search__results__notfound").addClass("section__search__results__notfound--show");
    }
}

const findWords = (word, list) => {
    var parseList = JSON.parse(JSON.stringify(list));
    parseList.map(e => {
        e._nameSchema = removeAccentsAndUpper(e._nameSchema)
        return { ...e };
    })
    var parseWord = removeAccentsAndUpper(word)
    let upperList = parseList.filter(e => e._nameSchema.search(parseWord) !== -1).map(e => { return e._id })
    const normalList = list.filter(e => { return upperList.indexOf(e._id) !== -1; });
    return normalList;
}

const removeAccentsAndUpper = (str) => {
    let result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return result.toUpperCase();
}
