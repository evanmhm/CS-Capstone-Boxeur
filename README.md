# CS-Capstone-Boxeur
OSU CS46X group 35 project repo, Boxeur case designer.

# Development
To get the site running on the OSU server, first ssh into the server (`ssh YOUR_USERNAME@flip.engr.oregonstate.edu`).
Then cd into the directory public_html by typing `cd public_html`. To get our code into this folder type
`git clone https://github.com/evanmhm/CS-Capstone-Boxeur.git ./boxeur`. Now the website will be running on your server
and you can go to it on your browser at http://web.engr.oregonstate.edu/~YOUR_USERNAME/boxeur/index.php

To get OAuth working, type `./composer.phar install` which will install google's OAuth tools for php. The ./vendor/ folder will be added with these tools (which is in the .gitignore so it won't be uploaded in commits).

# Troubleshoot
#### 403 Forbidden on a file
If you ever get 403 Forbidden's in the web console then run `./permissions.bash` which will set all the correct permissions for php, img, js, and css files.
