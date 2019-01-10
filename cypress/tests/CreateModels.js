/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

const models = require('../support/Models')
const modelPage = require('../support/components/ModelPage')
const entities = require('../support/Entities')
const actions = require('../support/Actions')
const editDialogModal = require('../support/components/EditDialogModal')
const train = require('../support/Train')
const memoryTableComponent = require('../support/components/MemoryTableComponent')

export function AllEntityTypes() {
  models.CreateNewModel('z-allEntityTypes')

  entities.CreateNewEntity({ name: 'multiValuedEntity', multiValued: true })
  entities.CreateNewEntity({ name: 'negatableEntity', negatable: true })
  entities.CreateNewEntity({ name: `my-Programmatic`, type: "Programmatic" })
  entities.pretrainedEntityTypes.forEach(entityType => { entities.CreateNewEntity({ type: entityType }) })

  // Manually EXPORT this to fixtures folder and name it 'z-allEntityTypes'
}

export function DisqualifyingEntities() {
  models.CreateNewModel('z-disqualifyngEnt')

  entities.CreateNewEntity({ name: 'name' })
  entities.CreateNewEntity({ name: 'want' })
  entities.CreateNewEntity({ name: 'sweets' })

  // NOTE: the {enter} in these strings are necessary to triger the entity detection.
  actions.CreateNewAction({ response: "What's your name?", expectedEntities: 'name', disqualifyingEntities: 'name' })
  actions.CreateNewAction({ response: 'Hey $name{enter}', disqualifyingEntities: ['sweets', 'want'] })
  actions.CreateNewAction({ response: 'Hey $name{enter}, what do you really want?', expectedEntities: 'want', disqualifyingEntities: ['sweets', 'want'] })
  actions.CreateNewAction({ response: "Sorry $name{enter}, I can't help you get $want{enter}" })

  // Manually EXPORT this to fixtures folder and name it 'z-disqualifyngEnt'
}

export function WaitVsNoWaitActions() {
  models.CreateNewModel('z-waitNoWait')

  // NOTE: the {enter} in these strings are necessary to triger the entity detection.
  actions.CreateNewAction({ response: 'Which animal would you like?' })
  actions.CreateNewAction({ response: 'Cows say moo!', uncheckWaitForResponse: true })
  actions.CreateNewAction({ response: 'Ducks say quack!', uncheckWaitForResponse: true })

  // Manually EXPORT this to fixtures folder and name it 'z-waitNoWait.cl'
}

export function WhatsYourName() {
  models.CreateNewModel('z-whatsYourName')
  entities.CreateNewEntity({ name: 'name' })
  actions.CreateNewAction({ response: "What's your name?", expectedEntities: 'name' })

  // NOTE: the {enter} in this call is necessary to triger the entity detection.
  actions.CreateNewAction({ response: 'Hello $name{enter}' })

  // Manually EXPORT this to fixtures folder and name it 'z-whatsYourName.cl'
}

// This model is created with a Training in it as well as Entities and Actions because
// this model is intended to test features of using a trained model.
export function TagAndFrog() {
  // models.ImportModel('z-tagAndFrog', 'z-tagAndFrog.cl')
  models.CreateNewModel('z-tagAndFrog')
  entities.CreateNewEntity({ name: 'multi', multiValued: true })
  actions.CreateNewAction({ response: "Hello" })
  actions.CreateNewAction({ response: "Hi" })

  modelPage.NavigateToTrainDialogs()
  cy.WaitForTrainingStatusCompleted()
  train.CreateNewTrainDialog()

  train.TypeYourMessage('This is Tag.')
  editDialogModal.LabelTextAsEntity('Tag', 'multi')
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Hello')
  cy.WaitForTrainingStatusCompleted()

  train.TypeYourMessage('This is Frog and Tag.')
  memoryTableComponent.VerifyEntityInMemory('multi', 'Tag')
  editDialogModal.VerifyEntityLabel('Tag', 'multi')
  editDialogModal.LabelTextAsEntity('Frog', 'multi')
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Hi')
  cy.WaitForTrainingStatusCompleted()

  train.TypeYourMessage('This is Tag and Frog.')
  memoryTableComponent.VerifyEntityInMemory('multi', ['Tag', 'Frog'])
  editDialogModal.VerifyEntityLabel('Tag', 'multi')
  editDialogModal.VerifyEntityLabel('Frog', 'multi', 1)
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Hi')

  train.Save()

  // Manually EXPORT this to fixtures folder and name it 'z-tagAndFrog.cl'
}

export function EndlessLoop() {
  // models.ImportModel('z-endlessLoop', 'z-endlessLoop.cl')
  models.CreateNewModel('z-endlessLoop')
  actions.CreateNewAction({ response: "Action One", uncheckWaitForResponse: true })
  actions.CreateNewAction({ response: "Action Two", uncheckWaitForResponse: true })
  actions.CreateNewAction({ response: "Action Three", uncheckWaitForResponse: true })

  modelPage.NavigateToTrainDialogs()
  cy.WaitForTrainingStatusCompleted()
  train.CreateNewTrainDialog()

  train.TypeYourMessage('hi')
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Action One')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action Two')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action Three')

  train.Save()

  train.CreateNewTrainDialog()

  train.TypeYourMessage('howdy')
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Action Two')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action Three')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action One')

  train.Save()

  train.CreateNewTrainDialog()

  train.TypeYourMessage('namaste')
  editDialogModal.ClickScoreActionsButton()
  train.SelectAction('Action Three')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action Two')
  cy.WaitForTrainingStatusCompleted()
  train.SelectAction('Action One')

  train.Save()

  // Manually EXPORT this to fixtures folder and name it 'z-endlessLoop.cl'
}

export function EndSessionActions() {

  models.ImportModel('sydney-flight', 'y-sydney-flight.cl')

  modelPage.NavigateToTrainDialogs()

  train.TypeYourMessage('coach')

  editDialogModal.ClickScoreActionsButton()

}

export function Travel() {
  models.CreateNewModel('z-travel')
  entities.CreateNewEntity({ name: 'departure', resolverType: 'datetimeV2', expectPopup: true })
  entities.CreateNewEntity({ name: 'return', resolverType: 'datetimeV2' })
  actions.CreateNewAction({ response: 'You are leaving on $departure{enter} and returning on $return{enter}', requiredEntities: ['departure', 'return'] })
  actions.CreateNewAction({ response: 'When are you planning to travel?', disqualifyingEntities: ['departure', 'return'] })

  // Manually EXPORT this to fixtures folder and name it 'z-travel.cl'
}