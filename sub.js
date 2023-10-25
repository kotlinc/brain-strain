const questionsMinus = []

const generateQuestionsMinus = (times, max) => {
	for (let i = 0; i < times; i++) {
  	const question = questionsMinus.length + 1
  	let n1 = Math.floor(Math.random() * max)
    let n2 = Math.floor(Math.random() * max)
    if (n1 > n2) {
    	const n3 = n2
      n2 = n1
      n1 = n3
    	questionsMinus.push([question, `${n2} - ${n1}`, n2 - n1])
    } else if (n1 > n2 || n2 === n1) {
  		questionsMinus.push([question, `${n1} - ${n2}`, n1 - n2])
    }
  }
}

const addQuestionsMinus = () => {
	questionsMinus.forEach(question => {
  	const n = question[0]
    const q = question[1]
    const a = question[2]
  	$('#questions-sub').append(`
    <li id="question${n}-sub"><b>${n}</b>: ${q} = <input id="question${n}-ans-sub" type=number></li>
    `)
    if (n !== 1) {
    	$(`#question${n}-sub`).hide()
    }
    const el = $(`#question${n}-ans-sub`)
    el.on('change', () => {
    	if (el.val() == a && n !== questionsMinus.length) {
      	$(`#question${n}-sub`).html(`<b>${n}</b>: Correct!`)
        $(`#question${n + 1}-sub`).show()
        $(`#question${n + 1}-ans-sub`).focus()
      } else if (el.val() == a && n === questionsMinus.length) {
      	const lvl = $('#lvl-sub')
        const lvln = Number(lvl.text())
      	$('#questions-sub').html('')
        questionsMinus.splice(0, questionsMinus.length)
        generateQuestionsMinus(lvln * 10 - (lvln * lvln), Math.round(lvln * (lvln * (lvln / 10)) + Math.PI * 2))
				addQuestionsMinus()
        lvl.text(lvln + 1)
      }
    })
  })
}

generateQuestionsMinus(8, 6)
addQuestionsMinus()
