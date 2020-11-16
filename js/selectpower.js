window.addEventListener('load', function () {
    console.log(gestdocRequest)//remplazar por llamada AJAX a futuro, por ahora no por que tendras error de cors

    document.getElementById("search").addEventListener("keyup", function () {
        var htmlBody = ''
        if (this.value.length >= 3) {
            document.getElementById('block-list').innerHTML = ''
            var justFound = findWords(this.value, gestdocRequest)
            htmlBody = htmlList(justFound);
        }
    });
})

function displayNews(section) {
    var element = document.createElement('li');
    element.classList.add("custom-li");
    element.onclick = function () {
        selectedItem(section);
    };
    element.innerHTML = section._nameSchema
    document.getElementById("block-list").appendChild(element);
}

function selectedItem(item) {
    alert('categoria:' + item._category)
}

const htmlList = list => {
    for (let i = 0; i < list.length; i++) {
        displayNews(list[i])
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
