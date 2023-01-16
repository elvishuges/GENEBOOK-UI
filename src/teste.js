{
    "messages": {
        "gameTitle": "",
        "initialImage": "",
        "initialAudio": "",
        "gameIntroduction": "Let's learn with game books",
        "gameStart": "Start game!",
        "gameContinue": "Continue",
        "goButton": ">>>",
        "contentToBeLoaded": "",
        "itemsText": "Items:",
        "actionsText": "Actions:",
        "exitsText": "Exits:",
        "goingTo": "Going to ... ",
        "optionsText": "Options:",
        "inventoryLinkText": "Inventory",
        "inventoryTitle": "## Inventory ##",
        "inventoryText": "List of collected items:",
        "noItemsCollected": "No items have been collected yet.",
        "mapLinkText": "Map",
        "mapText": "List of entries and exits performed by the player:",
        "creditsLinkText": "Credits",
        "creditsTitle": "GEnEbook - A Game Engine for Ebooks",
        "creditsText": "Developed by OMITTED.",
        "fromLabel": "From:",
        "toLabel": "To:"
    },
    "player": {
        "currentState": "game-start",
        "currentLocation": "",
        "collectedItems": [],
        "performedActions": [],
        "status": {
            "life": 0
        }
    },
    "actors": [],
    "items": [],
    "locations": [
        {
            "name": "CasaChapeuzinho",
            "title": "Casa da Chapeuzinho Vermelho",
            "descriptions": [
                {
                    "text": "Num belo dia, a mãe de chapeuzinho pede para ela levar doce para a sua vovó...",
                    "image": "Casa_Chapeuzinho",
                    "condition": "return getLocation(gc,'CasaChapeuzinho').visits == 1 "
                },
                {
                    "text": "Você voltou para cara, pois não se sentia segura para ir a casa da vovó sozinha.",
                    "image": "Casa_Chapeuzinho",
                    "condition": "return getLocation(gc,'CasaChapeuzinho').visits > 1 "
                }
            ],
            "actions": [],
            "exits": [
                {
                    "name": "ir_para_estrada",
                    "text": "Ir para a estrada",
                    "destination": "Estrada",
                    "requiresToShow": {
                        "items": [],
                        "actions": [],
                        "conditions": [
                            "return true "
                        ]
                    }
                }
            ],
            "visits": 1
        },
        {
            "name": "Estrada",
            "title": "Estrada Para a Floresta",
            "descriptions": [
                {
                    "text": "Chapeuzinho prometeu ir pela estradinha que chegava até a casa da vovó.",
                    "image": "Chapeuzinho_Estrada",
                    "condition": "return getLocation(gc,'Estrada').visits == 1 "
                }
            ],
            "actions": [],
            "exits": [],
            "visits": 0
        }
    ],
    "ends": []
}