const questionsPlus = []

const saveProgressAdd = () => {
  localStorage.setItem('additionlvl')
}

const generateQuestionsPlus = (times, max) => {
	for (let i = 0; i < times; i++) {
  	const question = questionsPlus.length + 1
  	const n1 = Math.floor(Math.random() * max)
  	const n2 = Math.floor(Math.random() * max)
  	questionsPlus.push([question, `${n1} + ${n2}`, n1 + n2])
  }
}

const addQuestionsPlus = () => {
	questionsPlus.forEach(question => {
  	const n = question[0]
    const q = question[1]
    const a = question[2]
  	$('#questions-add').append(`
    <li id="question${n}-add"><b>${n}</b>: ${q} = <input id="question${n}-ans-add" type=number></li>
    `)
    if (n !== 1) {
    	$(`#question${n}-add`).hide()
    }
    const el = $(`#question${n}-ans-add`)
    el.on('change', () => {
    	if (el.val() == a && n !== questionsPlus.length) {
      	$(`#question${n}-add`).html(`<b>${n}</b>: Correct!`)
        $(`#question${n + 1}-add`).show()
        $(`#question${n + 1}-ans-add`).triiger('focus')
      } else if (el.val() == a && n === questionsPlus.length) {
      	const lvl = $('#lvl-add')
        const lvln = Number(lvl.text())
      	$('#questions-add').html('')
        questionsPlus.splice(0, questionsPlus.length)
        generateQuestionsPlus(lvln * 10 - (lvln * lvln), Math.round(lvln * (lvln * (lvln / 10)) + Math.PI * 2))
				addQuestionsPlus()
        lvl.text(lvln + 1)
      }
    })
  })
}

generateQuestionsPlus(8, 6)
addQuestionsPlus()
