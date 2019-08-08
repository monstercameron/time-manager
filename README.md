Time management app

user Stories:

Employee:
As an employee I want to clock in to keep a count of my hours
As an employee I want to clock out for lunch/break
As an employee i want to clock out for the end of the day

Employer:
As an employer I want to make a schedule for a specified week
As an employer I want to see the schedule for a specified week
As an employer I want to see an employees time records
As an employer I want to modify an employees time record
As an employer I want to export an employees record


DB schema:

->  has one
<-> one to one
=>  has many
<=> many to many


day => hour
hour -> day
hour => employee
employee => period
period -> employee