// Function to get all media data (async version)
async function getAll() {
    try {
        const response = await fetch('sampleData.json'); 
        const text = await response.text(); 
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching the file:', error); 
        return [];
    }
}

// Function to get the most recent media from each type
async function getByDate() {
    const mediaData = await getAll(); 
    const groupedByType = {};

    // Group media items by type
    mediaData.forEach((media) => {
        const type = media.Type;
        const publishDate = new Date(media.PublishDate.split('-').reverse().join('-')); // Convert to Date object

        // If the type does not exist in groupedByType, create an array for it
        if (!groupedByType[type]) {
            groupedByType[type] = [];
        }

        // Add media item to the correct type group
        groupedByType[type].push({
            ...media,
            publishDate, // Store the date object directly for easier comparison
        });
    });

    // For each type, sort the items by PublishDate in descending order and pick the top 3
    const result = [];
    for (const type in groupedByType) {
        const sortedItems = groupedByType[type].sort((a, b) => b.publishDate - a.publishDate); // Sort by date descending
        result.push(...sortedItems.slice(0, 3)); // Take the top 3 most recent
    }

    return result; // Return all the most recent items per type
}

/*
* TODO - for real media service we could...
*   SELECT * 
    FROM media
    WHERE mediaid IN (
    SELECT MIN(mediaid) 
    FROM media 
    GROUP BY title, type 
    )
    ORDER BY RAND() 
    LIMIT 5;

* call getMedia with a randFive flag.
*/
// Function to pick 5 random items
async function getRandomFive() {
    const mediaData = await getAll(); // Fetch data asynchronously
    const shuffled = mediaData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

// Function to get all media items with the same title 
async function getByTitle(title) {
    const mediaData = await getAll(); // Fetch data asynchronously
    
    // Filter media items by matching title
    const filteredItems = mediaData.filter(media => media.Title && media.Title.toLowerCase() === title.toLowerCase());
    return filteredItems; // Return all items with the same title
}

async function autoComplete(input) {
    const mediaData = await getAll();
    // Filter the mediaData to find matches for the input term in the Title
    const filteredResults = mediaData
        .filter(item => item.Title.toLowerCase().includes(input.toLowerCase()))
        .map(item => ({
            Title: item.Title,
            Type: item.Type
        }));

    return filteredResults;
}

async function getBySearch(input) {
    if (!input.trim()) { // Check if input is empty or just whitespace
        return []; // Return an empty array when there's no search term
    }

    const mediaData = await getAll(); // Fetch the data from your service

    const filteredResults = mediaData.filter(item => 
        item.Title.toLowerCase().includes(input.toLowerCase()) ||
        item.Author.toLowerCase().includes(input.toLowerCase()) // Include author search
    );

    return filteredResults;
}


// Exporting the functions
export {
    getAll,
    getByDate,
    getRandomFive,
    getByTitle,
    autoComplete,
    getBySearch
};
