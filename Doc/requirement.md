<h1 style="text-align: center; color: blue;">Product Requirements</h1>
<h2 style="text-align: center; color: blue;">Fundraising Management App for Scouts</h2>
<h2 style="text-align: center; color: blue;">Team: 406 Not Acceptable</h2>

## Brief problem statement
The motivation for this Platform for Scout Troops is to facilitate fundraising and event management of each of the troops. Additionally, the main task of the application platform is to manage the each of the troops inventory so the Scouts can focus on selling more inventory and reduce paperwork required. Moreover, troops will have special events throughout their sales season, so they should be able to manage the inventory.

## System requirements
This application is intended to run on the latest web browsers, such as: Google Chrome, Safari, and Firefox. The application will be based on industry standard front-end and back-end frameworks.  

## Users profile
The system is intended for scout troop leaders and parents of the scouts. The minimum IT skills required for using the web-app includes, using a computer, accessing a website, signing up, and inputting data. They should also be familiar with using other smart devices such as a smartphone or a tablet.

Parents should be fully responsible and understand the objective of the fundraising program.

The troop leaders should have a good understanding of the application and how to manage their groups. They should also have some experience in reading data statistics since the web-app outputs them in different graphs.

## List of Features
    F1: Ability to view transaction histories of each of the scouts in the troop.
    F2: Ability to add, remove, and update scout information.  
    F3: The application will allow an admin to manage the database through a dashboard.  
    F4: The application will keep track of item and price, update and synchronize data when changes are made.
    F5: The application can keep track the sales report seasonally, analyze data and calculate the profit within any period.

## Functional requirements (user stories)

List the Priority as 1 (High Priority - Critical) to 3 (Low Priority – Would be nice if we have time)

| No.| User Story Name | Description | Priority |
|---|---|---|---|
| R1  | Registration  | The superuser, or administrator, will have the ability to add Troop leader accounts through an email invite process. Troop leaders will have the ability to add accounts for parents of the scouts through an email invite process. The email invite will allow Troop leaders and parents of scouts to register with a password.  |  1 |
| R2  | Login  | All users will be able to login only using an email and a password. On the login screen, users will have the option to reset their password through an email message if they forgot it.   | 1 |
| R3  | Sales Tracking  | The Troop leader should be able to view overall sales for individual scouts. They should also be able to set goals for the group and view progress towards the goals. A scout should be able to view their overall sales and the group sales, as well as group goals and the progress for those goals.  | 1  |
| R4  | Inventory Management | The troop leader can view the troop’s inventory and change product details. | 1  |
| R5  | Individual sales tracking  | The troop leader can view an individual scout’s sales records and filter results using a date range.  | 2 |
| R6  | Event tracking  | The troop leader can create events and allocate inventory for the event.  | 2  |
| R7  | Password reset | All users will have the ability to reset their password through an email that contains a link to a password reset page for that user.  | 2 |
| R8  | Offline database synchronization | Troop leader and scout can input the stored data offline. Once connected to the Internet, the data will be updated to the online database | 3 |
| R9  | Tasks and Notifications | Troop leaders can create tasks for the group or for individual group members. These tasks can have notifications sent both by email and through the web application. Additionally, there can be critical tasks which will appear more prominently in a user's dashboard. | 3 |


## Non-Functional Requirements
- This application will be responsive for both mobile and desktop websites.
- NoSQL based technologies cannot be used.
- The database will be secured, to prevent data loss.
- Troop leader and scout’s personal information will be hidden and can only be seen by the account owner when logged in
- The application will be accessible 24/7 online.
- There will be gradients, colors, and containers in the application to provide contrast to the different UI elements for ease of use.
