form = document.querySelector('#form')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    count_from = document.querySelector('#lower').value
    count_to = document.querySelector('#high').value
    count = document.querySelector('#count').value
    current_subject = document.querySelector("#selector").value

    localStorage['count_from'] = count_from
    localStorage['count_to'] = count_to
    localStorage['count'] = count
    localStorage['current_subject'] = current_subject

    window.location.href = 'test.html'
})