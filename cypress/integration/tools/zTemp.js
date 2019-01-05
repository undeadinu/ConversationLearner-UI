/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

const helpers = require('../../support/Helpers')
const homePage = require('../../support/components/HomePage')
const models = require('../../support/Models')
const modelPage = require('../../support/components/ModelPage')
const train = require('../../support/Train')
const trainDialogsGrid = require('../../support/components/TrainDialogsGrid')
const editDialogModal = require('../../support/components/EditDialogModal')

// Description: A temporary workspace for experimental code
describe('zTemp test', () =>
{
  it('zTemp test', () => 
  {
    models.ImportModel('z-errorHandling', 'z-disqualifyngEnt.Trained.cl')
    modelPage.NavigateToTrainDialogs()
    cy.WaitForTrainingStatusCompleted()
    
    modelPage.VerifyNoErrorIconOnPage()
  
    train.EditTraining('Hey', 'world peace', "Sorry $name, I can't help you get $want")
    editDialogModal.InsertUserInputAfter('Sam', 'InsertedText')
  })
})