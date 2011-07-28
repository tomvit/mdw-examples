/**
 * Example of a service discovery that operates on services' categories
 * Created for MDW CTU Course, 2011 
 * 
 * @author
 * Tomas Vitvar, http://vitvar.com
 * 
 * @License
 * MIT License
 */

// Following declarations are for clarifications only;
// There is no checking in JavaScript that objects will conform to these classes
// Interface for the element in the service taxonomy
var taxonomy_element = {
    // name of the category that 
    // this element represents in the taxonomy
    category_name : null,

    // array of taxonomy_element objects; 
    // is empty if no sub-categories exist
    categories : []
};

// interface for the element in the service directory
var service_description = {
    // name (String) of the category
    category_name : null, 
    
    // textual description
    description : ""
};

// returns a taxonomy element that matches category_name
function findTaxonomyElement(category_name, taxonomy_element) {
    // check if this is the element
    if (category_name == taxonomy_element.category_name)
        return taxonomy_element;
    else {
        // go through all sub-categories of this element
        // this is the depth-first search of the taxonomy tree
        for (var i = 0; i < taxonomy_element.categories.length; i++) {
            var r = findTaxonomyElement(category_name, 
                taxonomy_element.categories[i]);
            if (r  !== null)
                return r;
        }
                
        // return null if the element was not found in the subtree
        return null;
    }
}

// returns services from a directory that match a goal category goal_cat
// they both share a taxonomy with taxonomy_root
function discover(goal_cat, directory, taxonomy_root) {

    // create an empty array
    var result = [];

    // find a taxonomy element for the goal_cat
    var gte = findTaxonomyElement(goal_cat, taxonomy_root);
    
    // check if there exsits a taxonomy element for the goal category
    if (gte !== null) {
        // loop through all service descriptions in the directory
        for (var i = 0; i < directory.length; i++) 
            // find taxonomy element for the service category
            // in the subtree defined by gte
            if (findTaxonomyElement(directory[i].category_name, gte) !== null)
                // add the service description to the result
                result.push(directory[i]);
    }
                
    // return the result
    return result;
}

/* following functions may be used to test the category discovery */

var fs = require('fs');

// note that o3-xml is not a standard node.js module;
// install it with npm install o3-xml
var xml = require('o3-xml');

// load the taxonomy from xml
function readTaxonomy(taxonomyFile) {
    buffer = fs.readFileSync(taxonomyFile, 'utf-8');
    doc = xml.parseFromString(buffer.toString('utf-8'));
    
    var taxonomy_root = {};
    
    var readElement = 
        function(xml_element, taxonomy_element) {
            taxonomy_element.category_name = xml_element.nodeName;
            taxonomy_element.categories = [];
            if (xml_element.childNodes)
                for (var i = 0; i < xml_element.childNodes.length; i++) {
                    if (xml_element.childNodes[i].nodeType == 1) { // it is the element type
                        var e = {};
                        readElement(xml_element.childNodes[i], e);
                        taxonomy_element.categories.push(e);
                    } 
                }
        };
        
    readElement(doc.documentElement, taxonomy_root);
    return taxonomy_root;
}

// you need to change the path for taxonomy.xml file based on
// location from where you run this js file
var taxonomy_root = readTaxonomy("./taxonomy.xml");

var directory = [ 
    { category_name : "order" }, 
    { category_name : "book" }, 
    { category_name : "TV", description : "electronic4u" }, 
    { category_name : "computer", description : "mall.cz/computers" }, 
    { category_name : "TV", description: "mall.cz/TVs" } ];

var result = discover("electronics", directory, taxonomy_root);
if (result.length === 0)
    console.log("No services that match the requested category found!");
else
    for (var i = 0; i < result.length; i++)
        console.log(result[i].description);