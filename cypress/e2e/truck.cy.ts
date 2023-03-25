describe('Create Truck',()=>{
  beforeEach(()=> {
    cy.visit('/trucks/create')
  });

  it('using right fields', () =>{
    cy.get('[id="registration"]').type('Test registration');
    cy.get('[id="batteryCap"]').type('Test batteryCap');
    cy.get('[id="maxBatteryCap"]').type('Test maxBatteryCap');
    cy.get('[id="electricRange"]').type('Test electricRange');
    cy.get('[id="chargeTime"]').type('Test chargeTime');
    cy.get('[id="tareWeight"]').type('Test tareWeight');
    cy.get('[type="submit"]').click();
  })
});

describe('Truck Test', () => {
  it('Create Truck page', () => {
    cy.visit('/trucks/create')
  })

  it('Trucks in h3', () => {
    cy.visit('/trucks/create')
    cy.get('h3').contains('create')
  })

  it('List Truck page', () => {
    cy.visit('/trucks/list')
  })

  it('Inhibit Truck', () => {
    cy.wait(1000);
    cy.get('[id="buttonInibir"]').contains("Inhibit").click();
    cy.wait(1000);
  });

  it('Disinhibit Truck', () => {
    cy.wait(1000);
    cy.get('[id="buttonDesinibir"]').contains("Disinhibit").click();
    cy.wait(1000);
  });

  it('List in h3', () => {
    cy.visit('/trucks/list')
    cy.get('h3').contains('listing')
  })

  it('List Trucks page', () => {
    cy.visit('/trucks/list')
  })

  it('Create in h3', () => {
    cy.visit('/trucks/create')
    cy.get('h3').contains('create')
  })
})
