# InfoModal Component

This component displays a modal with information about nearby items. It takes the following props: 

- `nearbyItems`: an array of objects representing nearby places
- `isOpen`: an array of boolean values indicating whether a given modal is open or closed

The component iterates through `nearbyItems` and displays the following information for each item:
- The place name
- An image retrieved using the `getPhoto` function from the `fetchData.js` module
- The total number of user ratings
- The address

The image is retrieved using `watch` to detect when a modal is opened and then finding the photo reference in the array of photos. The `convertFile` function is used to convert the image data to a base64 URL that is then displayed in the modal.
