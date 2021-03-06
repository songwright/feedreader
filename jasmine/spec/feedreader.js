/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('should define all feeds', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed in the
         * allFeeds object and ensures it has a URL defined and
         * that the URL is not empty.
         */
        it('should define urls', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This is a test that loops through each feed in the
         * allFeeds object and ensures it has a name defined and
         * that the name is not empty.
         */
        it('should define feed names', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* This test suite tests the menu */
    describe('The menu', function() {

        /* This a test that ensures the menu element is hidden
         * by default.
         */
        it('should be hidden', function() {
            // const body = document.querySelector('body');
            // expect(body.classList.contains('menu-hidden')).toBe(true);
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* This is a test that ensures the menu changes visibility
         * when the menu icon is clicked. This test has two
         * expectations: does the menu display when clicked and
         * does it hide when clicked again.
         */
        it('should click on and off', function() {
            // const body = document.querySelector('body');
            let menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        })
    });

    /* This test suite tests the initial entries of loadFeed */
    describe('Initial Entries', function() {


        /* This is a test that ensures when the loadFeed function is
         * called and completes its work, there is at least a single
         * .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should load at least one feed', function() {
            const feed = document.querySelector('div.feed');
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* This test suite tests for feed changes */
    describe('New Feed Selection', function() {
        let firstFeed = document.querySelector('div.feed');
        let secondFeed = document.querySelector('div.feed');

        /* This is a test that ensures when a new feed is loaded by
         * the loadFeed function that the content actually changes.
         * The nested callback follows the asynchronous behavior.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = firstFeed.innerHTML;
                loadFeed(1, function() {
                    secondFeed = secondFeed.innerHTML;
                    done();
                });
            });
        });

        it('should change content', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
