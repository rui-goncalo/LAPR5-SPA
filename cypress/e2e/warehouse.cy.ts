describe('Create Warehouse',()=>{
    beforeEach(()=> {
        cy.visit('/warehouses/create')
    });

    it('using right fields', () =>{
        cy.get('[id="warehouseAddress"]').type('Teste Address');
        cy.get('[id="warehouseDesignation"]').type('Teste Designation');
        cy.get('[id="warehouseGeoCoord"]').type('Teste GeoCoord');
        cy.get('[type="submit"]').click();
    })
});

describe('Warehouse Tests', () => {
    it('Create Warehouse page', () => {
      cy.visit('/warehouses/create')
    })

    it('Warehouses in h3', () => {
      cy.visit('/warehouses/create')
      cy.get('h3').contains('create')
    })

    it('Edit Warehouse page', () => {
      cy.visit('/warehouses/edit')
    })

  it('Edit address in Warehouse', () => {
    cy.wait(3000);
    cy.get('[id="buttonEdit"]').contains("Edit").click();
    cy.wait(1000);
    cy.get('[id="warehouseAddress"]').clear();
    cy.wait(1000);
    cy.get('[id="warehouseAddress"]').type('Updating Address');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

    it('Edit in h3', () => {
      cy.visit('/warehouses/edit')
      cy.get('h3').contains('edit')
    })

    it('List Warehouse page', () => {
      cy.visit('/warehouses/list')
    })

    it('Inhibit Warehouse', () => {
      cy.wait(1000);
      cy.get('[id="buttonInibir"]').contains("Inhibit").click();
      cy.wait(1000);
    });

    it('Disinhibit Warehouse', () => {
      cy.wait(1000);
      cy.get('[id="buttonDesinibir"]').contains("Disinhibit").click();
      cy.wait(1000);
    });

    it('Listintg in h3', () => {
      cy.visit('/warehouses/list')
      cy.get('h3').contains('listing')
    })
  })
