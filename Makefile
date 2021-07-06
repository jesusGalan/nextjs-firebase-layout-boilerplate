build-image:
	docker build . -t my-next-js-app

run-container:
	docker run -p 3000:3000 my-next-js-app