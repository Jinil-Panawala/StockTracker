# Stock Watchlist

Can be found at: `http://stockwatchlist.us.to`
This project is hosted on AWS via an EC2 instance. 

This is a MERN stack project, where I've created a stock watchlist that lets a user search for stocks and view related data (including historical data via graphs), and save stocks to a watchlist. 

Currently, there is only 1 user (and only 1 watchlist), however in the future, a login system will be implemented allowing users to sign up and have access to their own personal stockwatchlist. 

The frontend (client) is built via `npm run build` and is served from the backend (server) via Express. This is then deployed on an AWS EC2 instance using `pm2` and `nginx`. 

My main motivation to create this project was to gain exposure to full stack development. More specifically, I wanted experience in building a backend and going through the process of choosing appropriate libraries and technologies for this project. In addition, I wanted to create an app from start to finish (i.e. from design to deployment) and go through that process (something that I greatly enjoyed). 

Here are some sample pictures in case the link is down or if the EC2 instance has been terminated. 

The Homepage:
![Home Page](https://github.com/Jinil-Panawala/StockWatchlist/assets/55501226/8973e188-0866-4f99-a1c0-baba7ba9243a)

Sample Stock Search:
![Stock Search](https://github.com/Jinil-Panawala/StockWatchlist/assets/55501226/a50a9dfc-951a-468c-92ae-7b805997b37a)

Saved Stocks Watchlist:
![Watchlist](https://github.com/Jinil-Panawala/StockWatchlist/assets/55501226/73affdfd-908e-4205-92c4-4d9ecb7c0086)
