# CS-Capstone-Boxeur
OSU CS46X group 35 project repo, Boxeur case designer. Implemented in PHP, JS, CSS, and HTML this online tool allows users to create cases of different specifications to be exported for 3D printing or laser cutting.

The latest version is running live at http://web.engr.oregonstate.edu/~hopperme/boxeur/index.php

# Development
To get the site running on the OSU server, first ssh into the server (`ssh YOUR_USERNAME@flip.engr.oregonstate.edu`).
Then cd into the directory public_html by typing `cd public_html`. To get our code into this folder type
`git clone https://github.com/evanmhm/CS-Capstone-Boxeur.git ./boxeur`. Now the website will be running on your server
and you can go to it on your browser at http://web.engr.oregonstate.edu/~YOUR_USERNAME/boxeur/index.php

To get OAuth working, type `./composer.phar install` which will install google's OAuth tools for php. The ./vendor/ folder will be added with these tools (which is in the .gitignore so it won't be uploaded in commits).

On the first install you will most likely need to run `./permissions.bash` which sets the correct permissions for the site's elements.

If you would like to run the project on your local machine (which is untested), the OSU server uses PHP version 7.2.28 and [this page](https://www.w3schools.com/php/php_install.asp) has a tutorial on php and links to resources to install the necessary components.

# Senior Software Development Documents
[Final Report](/docs/Final_Report__Archive.pdf)

[Problem Statement](/docs/Problem_statement.pdf)

[Requirements document](/docs/Requirements_Document.pdf)

[Design document](/docs/Design_Document.pdf)

[Code review summary and response](/docs/CodeReviewChanges.pdf)

[Feedback from the code review](/docs/AllCodeReviewFeedback.pdf)


# Troubleshoot
#### 403 Forbidden on a file
If you ever get 403 Forbidden's in the web console then run `./permissions.bash` which will set all the correct permissions for php, img, js, and css files.

You will run into OAuth permission errors if your hosted version of the site is not listed as a trusted redirect url in the google OAuth admin panel. If you would like to request that your version of the site be added to the trusted redirects, send an email to Evan at hopperme@oregonstate.edu.
