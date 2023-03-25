describe('Delivery Tests', () => {
  beforeEach(() => {
    cy.visit('/deliveries/create')
  });

  it('using right fields', () => {
    cy.get('[id="deliveryDate"]').type('07-12-2022');
    cy.wait(1000);
    cy.get('[id="mass"]').type('23');
    cy.wait(1000);
    cy.get('[id="warehouseId"]').select('126');
    cy.wait(1000);
    cy.get('[id="loadTime"]').type('10');
    cy.wait(1000);
    cy.get('[id="unloadTime"]').type('20');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
  })
});
  /* it('Create Delivery page', () => {
    cy.visit('/deliveries/create')
    cy.wait(1000);
  }) */

describe('Delivery Tests', () => {


  it('Deliveries in h3', () => {
    cy.visit('/deliveries/create')
    cy.get('h3').contains('create')
    cy.wait(1000);
  })

  it('Edit Delivery page', () => {
    cy.visit('/deliveries/edit')
    cy.wait(1000);
  })

  it('Edit mass in Delivery', () => {
    cy.get('[id="buttonEdit"]').contains("Edit").click();
    cy.wait(1000);
    cy.get('[id="mass"]').clear();
    cy.wait(1000);
    cy.get('[id="mass"]').type('345');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it('Edit in h3', () => {
    cy.visit('/deliveries/edit')
    cy.get('h3').contains('edit')
    cy.wait(1000);
  })

  it('List Deliveries page', () => {
    cy.visit('/deliveries/list')
    cy.wait(1000);
  })

  it('Listing in h3', () => {
    cy.visit('/deliveries/list')
    cy.get('h3').contains('listing')
    cy.wait(1000);
  })

  it('Sort by', () => {
    cy.wait(1000);
    cy.get('[class="fa fa-fw fa-sort"]').click({ multiple: true });
    cy.wait(1000);
  })


  it('Search field', () => {
    cy.wait(1000);
    cy.get('[id="searchfield"]').type("Par");
    cy.wait(1000);
  })
})
