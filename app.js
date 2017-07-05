(function(){
    var desenhos = []
    var canvas = document.querySelector("#canvas")
    var pincel = canvas.getContext("2d")
    //pincel.fillStyle = "black";
    var socket = io('http://localhost:3000')


    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(data => {
        data.map(item => {
            pincel.fillStyle = item.color;
            pincel.fillRect(item.x - 1.5, item.y - 1.5, 3, 3)
        })
    })
    .catch(err => {
        console.log('not pointers')
    })

    socket.on('draw', function(data) {
        pincel.fillStyle = data.color
        pincel.fillRect(data.x - 1.5, data.y - 1.5, 3, 3)
    })


    function  getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
    }

    canvas.addEventListener('click', function(event) {
        let pos = getMousePos(canvas, event)
        pincel.fillStyle = localStorage.getItem('cor')
        pincel.lineWidth = 15
        pincel.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3)

        socket.emit('room', {
            x: pos.x,
            y: pos.y,
            color: localStorage.getItem('cor')
        })

    })

    var cores = document.querySelectorAll(".color")
    cores.forEach(cor => {
        cor.addEventListener('click', function(e) {
            localStorage.setItem('cor',cor.getAttribute('data-cor'))
        })
    })



})()
