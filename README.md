# Read Me

This was a very fun project to work on. I probably spent more time tinkering it that I should have, but was really 
enjoying my self got lost in the build a bit.  I focused of building a solid user interface with a clean look and 
feel.  The set up is pretty straight forward.  Search terms and dropdowns at the top.  Click on a movie result to 
get the details from that movie.  To save space I broke up the movie details into 3 slides of a carousel.  Also if 
the movie poster is not listed or returns a 404 I replaced it with markup.  There are still instances of broken 
images when the image url returns a "not found" message instead of 404'ing (All about Eve for example).  Given more 
time I would find a solution for that as well.

I added some additional functionality where the user can add notes on each movie and give them a personal rating as 
well as notes on the film. 
This data is saved in local storage.  I thought it added some interactivity to engage the user and it fit the 
purpose of the app nicely.  I also displayed the user's rating to the movie list.  You'll notice the way the stars 
display is reactive.  When there is enough width you see 10 stars partially filled in gold to reflect the rating.  As 
the browser narrows it changes to a 1 digit rating and the star icon, then disappears completely on the narrowest 
windows. The breakpoints for this change when you have the movie data visible on the right.  This added feature was 
probably my favorite of the build.

The most interesting problem was how to get the total number of search results since that wasn't in the return data 
of the query.  My solution to run a second query using the totalPage value returned from there I was able to query 
for the last page of results. Then I multiplied the limit by the total pages minus one and add the count from the last 
page. 
This is far more efficient  than the brute force approach. If I had more time I would have set it up so that it 
would only run the "last page" query when user changed the title search term or the genre.  If they were only 
changing the page number the results total wouldn't need to updated so there would be no reason to run that 2nd query. It's a minor savings but at large scale that might be significant and I always try to keep that in mind.

I hope you enjoy this and I look forward to discussing this with you in the next step.