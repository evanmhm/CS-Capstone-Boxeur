# CS-Capstone-Boxeur
OSU CS46X group 35 project repo, Boxeur case designer.

# Development
To get the site running on the OSU server, first ssh into the server (`ssh YOUR_USERNAME@flip.engr.oregonstate.edu`).
Then cd into the directory public_html by typing `cd public_html`. To get our code into this folder type
`git clone https://github.com/evanmhm/CS-Capstone-Boxeur.git ./boxeur`. Now the website will be running on your server
and you can go to it on your browser at http://web.engr.oregonstate.edu/~YOUR_USERNAME/boxeur/index.php

# Troubleshoot
#### 403 Forbidden on a file
Run these two commands in the base directory for the website (where index.php is)

`find . -type d -exec chmod 755 {} \;`

`find . -type f -exec chmod 644 {} \;`
