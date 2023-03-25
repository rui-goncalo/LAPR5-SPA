describe('Route Tests', () => {
  it('Create Route page', () => {
    cy.visit('/routes/create')
  })

  it('Create a route', () => {
    cy.get('[id="origin"]').select('2');
    cy.wait(1000);
    cy.get('[id="destination"]').select('130');
    cy.wait(1000);
    cy.get('[id="distance"]').type('300');
    cy.wait(1000);
    cy.get('[id="timeDistance"]').type('60:00');
    cy.wait(1000);
    cy.get('[id="energySpent"]').type('123');
    cy.wait(1000);
    cy.get('[id="extraTimeBattery"]').type('15:00');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it('Routes in h3', () => {
    cy.visit('/routes/create')
    cy.get('h3').contains('create')
  })

  it('Edit Route page', () => {
    cy.visit('/routes/edit')
  })

  it('Edit distance in Route', () => {
    cy.get('[id="buttonEdit"]').contains("Edit").click();
    cy.wait(1000);
    cy.get('[id="distance"]').clear();
    cy.wait(1000);
    cy.get('[id="distance"]').type('500');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it('Edit in h3', () => {
    cy.get('h3').contains('edit')
  })

  it('List Routes page', () => {
    cy.visit('/routes/list')
  })

  it('Listintg in h3', () => {
    cy.get('h3').contains('listing')
  })

  it('Change Items per page to 10', () => {
    cy.wait(1000);
    cy.get('[id="itemsoptions"]').select('10');
    cy.wait(1000);
  })

  it('Change Items per page to 5', () => {
    cy.wait(1000);
    cy.get('[id="itemsoptions"]').select('5');
    cy.wait(1000);
  })

  it('Next page', () => {
    cy.wait(1000);
    cy.get('[class="pagination-next"]').click();
    cy.wait(1000);
  })
})
