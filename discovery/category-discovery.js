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
