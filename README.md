**Challenges Faced**

One challenge I faced was setting up the user typing message. Originally, I had it set up to use addNewMessage however it would display the message for every character the user typed, even when the keyup event listener was being used. I fixed this by using fallback.innerHTML to display the message instead.

Another challenge I faced was setting up the containers on the home page. Originally I had just one fluid container on the page, however this would create a gap to the right of the second row. I then realized that each row needed its own container and this fixed the problem.

**How the Chat Communicates with the Server**

When client.js does a socket.emit event it sends the first argument as a message to the server (in this case index.js) and if index.js does a socket.emit event it sends the message to all clients. A socket.on event is how that device will behave as a result of these events, for example, displaying a message that the user has joined, left or typing.

reference: https://socket.io/get-started/chat/

**Development Process and Design Report**

I started the website by making a framework for the general layout of the web pages (mainly the home and about pages). This included the banner and navigation bar, which were kept consistent across the two pages, however, I made the design more simple for the chat page so that I could focus on the javascript more. I also utilized Bootstrap 5 at this point, since this aids the overall appearance of a website and allows it to be responsive. 
Next I added the content and information to the home page and then put supplementary information on the about page.
I added a carousel of images to provide context to the hobbies section. All of these pictures were taken by me, meaning i could having to find images to license. I chose to add an accordion to make the webpage more interactive and interesting for the user.
I then validated all of my CSS and HTML and removed all the errors that were found and added comments to the code.
Lastly, I worked on the chat application, and I was able to set up the join message, leaving message and typing message.

Throughout the process I made git commits to safely back up my work.

The colours on the page were chosen to match the banner image. Darker colours were chosen since this is easier on the eyes. I made the borders rounded as this provides a neater appearance.

*Changes to default bootstrap styles*

One change i made was the border colour of the cards on the home page. I did this to match the background colour better and make them more visible on the page.
Another change i made was to the background and text colours on the navigation buttons. I did this in order to match the theme of the rest of the web pages.
Using '!important' in the arguments provided to be a useful way of overriding the default bootstrap properties.