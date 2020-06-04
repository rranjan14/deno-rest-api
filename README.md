# deno-rest-api
A basic restful api built using deno.

# Third party packages used
  - Oak -> framework for easily creating restful api in deno.
  - deno-mongo -> third party plugin used for connecting to MongoDB database.
  - djwt -> third party module for creating and validating jwt tokens.
  - bcrypt -> third party module used for hashing passwords.
  - denon -> third party module which behaves similar to the npm package nodemon. Saves effort.
  
# To run the project
  - Clone the repository.
  - Extract files.
  - Open the file in terminal.
  # Run the following command:
    denon run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable server.ts
    
