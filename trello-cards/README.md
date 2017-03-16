# Rename Trello card titles

More information: see the blog post entry


```javascript
var selectedCards = [...$('div.list-card')])

var removePrefix = card => renameCard(card, (title) => title.substring(4))

// WARNING: this performs the modification
//selectedCards.forEach(removePrefix)
```

You can also filter the cards to which apply the modification:

```javascript
//Those who match "[1]" or "[3]"
var cardsSubset = [...$('div.list-card')].filter(card => card.innerText.match(/\[[13]\]/))
```
