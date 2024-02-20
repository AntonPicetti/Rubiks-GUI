import cv2

def display_image(image):
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

image = cv2.imread('./uploads/image-1708366881685.png')

cropped = image[200:800, 250:750]
gray_cropped = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)  # Convert cropped image to grayscale
rescaled = cv2.resize(gray_cropped, (64, 64))  # Rescale the image to 32x32

print(image.shape)
print(cropped.shape)
print(gray_cropped.shape)
print(rescaled.shape)

cv2.imwrite('rescaled.png', rescaled)  # Save the rescaled image as a PNG file on disk
