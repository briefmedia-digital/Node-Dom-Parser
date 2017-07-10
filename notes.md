1. scrape output from new drupal admin and parse to our format of json to go to react.
2. scrape old site into simple format for importing into new schema

# Himalaya (html to json repo)
- almost fits our schema perfectly
- works well for hitting all elements
- con: no json to html
- con: doesn't correctly convert tables to json

# CasperJS
- Great for specifying the exact element in which to move to json
- Need to process text fields more thoroughly
- Couldn't get it to work with nodejs

# Native DOMParser
- does't handle self closing tags (ie img, link, input)
- only works with valid html
- works best with XML

# Content Migration
- Migrating content from the current site will be tricky for a few reasons.
	1. Elements can be stacked, instead of nested, without clear correlation such as image captions
	2. Embedded areas, do we scrape and recreate video playlists or manually move
	3. Images, do we port to s3 upon migration script, yes
	4. "Related Articles" lack of identification in HTML
	5. Any customized element without clear identification in HTML via classes or IDs



# Questions

1. Do we want to import content from the current site to new site so that it is editable?
2. Do I need to send 
