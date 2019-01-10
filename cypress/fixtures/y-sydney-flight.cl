{
    "trainDialogs": [
        {
            "trainDialogId": "e4d8fa2b-5b32-4c0b-bbc7-3f6dcdfacba5",
            "rounds": [
                {
                    "extractorStep": {
                        "textVariations": [
                            {
                                "text": "fly to sydney",
                                "labelEntities": [
                                    {
                                        "entityId": "3c61a927-5355-4856-82db-46fad1f923d1",
                                        "startCharIndex": 7,
                                        "endCharIndex": 12,
                                        "entityText": "sydney",
                                        "resolution": {},
                                        "builtinType": "LUIS"
                                    }
                                ]
                            }
                        ]
                    },
                    "scorerSteps": [
                        {
                            "input": {
                                "filledEntities": [
                                    {
                                        "entityId": "3c61a927-5355-4856-82db-46fad1f923d1",
                                        "values": [
                                            {
                                                "userText": "sydney",
                                                "displayText": "sydney",
                                                "builtinType": "LUIS",
                                                "resolution": {}
                                            }
                                        ]
                                    }
                                ],
                                "context": {},
                                "maskedActions": []
                            },
                            "labelAction": "e6820789-a549-4eb1-90d4-b7ddb1d49d88",
                            "metrics": {
                                "predictMetrics": {
                                    "blisTime": 0.011940479278564453,
                                    "contextDialogBlisTime": 0
                                }
                            }
                        }
                    ]
                },
                {
                    "extractorStep": {
                        "textVariations": [
                            {
                                "text": "next monday",
                                "labelEntities": [
                                    {
                                        "entityId": "baf9ceea-08fd-4180-b52b-b21a640c0156",
                                        "startCharIndex": 0,
                                        "endCharIndex": 10,
                                        "entityText": "next monday",
                                        "resolution": {
                                            "values": [
                                                {
                                                    "timex": "2019-01-14",
                                                    "type": "date",
                                                    "value": "2019-01-14"
                                                }
                                            ]
                                        },
                                        "builtinType": "builtin.datetimeV2.date"
                                    }
                                ]
                            }
                        ]
                    },
                    "scorerSteps": [
                        {
                            "input": {
                                "filledEntities": [
                                    {
                                        "entityId": "3c61a927-5355-4856-82db-46fad1f923d1",
                                        "values": [
                                            {
                                                "userText": "sydney",
                                                "displayText": "sydney",
                                                "builtinType": "LUIS",
                                                "resolution": {}
                                            }
                                        ]
                                    },
                                    {
                                        "entityId": "baf9ceea-08fd-4180-b52b-b21a640c0156",
                                        "values": [
                                            {
                                                "userText": "next monday",
                                                "displayText": "2019-01-14",
                                                "builtinType": "builtin.datetimeV2.date",
                                                "resolution": {
                                                    "values": [
                                                        {
                                                            "timex": "2019-01-14",
                                                            "type": "date",
                                                            "value": "2019-01-14"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "context": {},
                                "maskedActions": []
                            },
                            "labelAction": "7672be36-b890-483b-82cf-3fb327838329",
                            "metrics": {
                                "predictMetrics": {
                                    "blisTime": 0.012023687362670898,
                                    "contextDialogBlisTime": 0
                                }
                            }
                        }
                    ]
                }
            ],
            "initialFilledEntities": [],
            "createdDateTime": "2019-01-09T20:10:27.2724042+00:00",
            "lastModifiedDateTime": "2019-01-09T20:10:59+00:00"
        }
    ],
    "actions": [
        {
            "actionId": "e6820789-a549-4eb1-90d4-b7ddb1d49d88",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "actionType": "TEXT",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"soonest departure date\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "3c61a927-5355-4856-82db-46fad1f923d1"
            ],
            "negativeEntities": [
                "baf9ceea-08fd-4180-b52b-b21a640c0156",
                "331b18fb-8de4-45f0-a968-378b4ec5fef8"
            ]
        },
        {
            "actionId": "7672be36-b890-483b-82cf-3fb327838329",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "actionType": "TEXT",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"first or coach class\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "3c61a927-5355-4856-82db-46fad1f923d1",
                "baf9ceea-08fd-4180-b52b-b21a640c0156"
            ],
            "negativeEntities": [
                "331b18fb-8de4-45f0-a968-378b4ec5fef8"
            ],
            "suggestedEntity": "331b18fb-8de4-45f0-a968-378b4ec5fef8"
        },
        {
            "actionId": "744ba344-5d1c-4a77-8ea1-df60545b6897",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "actionType": "END_SESSION",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"0\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [],
            "negativeEntities": []
        }
    ],
    "entities": [
        {
            "entityId": "3c61a927-5355-4856-82db-46fad1f923d1",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "entityName": "destinationCity",
            "entityType": "LUIS",
            "isMultivalue": false,
            "isNegatible": false,
            "resolverType": "none"
        },
        {
            "entityId": "baf9ceea-08fd-4180-b52b-b21a640c0156",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "entityName": "builtin-datetimev2",
            "entityType": "datetimeV2",
            "isMultivalue": false,
            "isNegatible": false
        },
        {
            "entityId": "331b18fb-8de4-45f0-a968-378b4ec5fef8",
            "createdDateTime": "2019-01-09T20:10:16.2628083+00:00",
            "entityName": "fareClass",
            "entityType": "LUIS",
            "isMultivalue": false,
            "isNegatible": false,
            "resolverType": "none"
        }
    ],
    "packageId": "de0896f4-01ee-4fa2-b264-99ecbe67a7d9"
}