startnpm:
	npm start
firststart:
	npm install
createDock:
	docker build --tag pet_front:1.0 .
runDock:
	#docker run --publish 3000:3000 --detach --name pets_front pet_front:1.0
	#docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true pet_front:1.0
	docker run -it -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true pet_front:1.0
fullDock:
	make createDock
	make runDock
restartDock:
	make rmDock
	make createDock
	make runDock
runcomp:
	docker-compose up
rmDock:
	docker rm --force pets_front