var renameCard = function(card, titleModifier) {
  makeEditable(card)

  open(card)
  
  renameTitle()

  saveCard()

  function makeEditable(card) {
    card.className="list-card js-member-droppable ui-droppable active-card"
  }

  function open(card) {
    $('span.icon-edit',card).click()
  }

  function renameTitle(){
    var oldTitle = $('div.list-card-details>textarea')[0].textContent
    $('div.list-card-details>textarea')[0].textContent=titleModifier(oldTitle)
  }

  function saveCard() {
    $('input', $('div.list-card-details>textarea').parent().parent().parent()).click()
  }
}
