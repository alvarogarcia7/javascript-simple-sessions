# Rename Trello card titles


```javascript
var selectedCards = [...$('div.list-card')])

// WARNING: this performs the modification
//selectedCards.forEach(card => renameCard(card, (title) => title.substring(4)))
```

You can also filter the cards to which apply the modification:

```javascript
//Those who match "[1]" or "[3]"
var cardsSubset = [...$('div.list-card')].filter(card => card.innerText.match(/\[[13]\]/))
```
