# React and Nodejs IP Geolocation App

This React application fetches IP and geolocation data and displays it to the user along with a map.
The backend is built with Node.js and is available at this [repo](https://github.com/gtcore902/myIP-backend).
Follow the instructions to start the server.

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/gtcore902/myIP-frontend.git
```

2. Install dependencies:

```bash
npm install or yarn
```

3. Start the development server:

```bash
npm start or yarn start
```

4. Don't forget to install this [repo](https://github.com/gtcore902/myIP-backend) and launch the backend server.

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Displays IP address, city, country, latitude, longitude, and region information.
- Shows a map based on the latitude and longitude information.
- Utilizes React hooks for state management.
- Fetches data from various APIs including geolocation, IP lookup.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [SCSS](https://sass-lang.com/) - CSS preprocessor.
- [NodeJS](https://nodejs.org/en) - JavaScript runtime platform.
- [ipinfo.io](https://ipinfo.io) - Geolocation API for fetching location data based on IP address.
- [OpenStreetMap](https://openstreetmap.org/) - Collaborative, open-source mapping platform created by a global community of volunteers.
- [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [Backend with NodeJS](https://getip.gaetantremois.fr) - Returns an object with the ip address

## Contributing

You're welcome :sunglasses:

If you wish to use or contribute to the project, follow these steps:point_down::

- Fork the project
- Replace in IP_INFO_API_KEY_EXAMPLE.js file the key with you own key:
  > `const IP_INFO_API_KEY = 'YOUR_IP_INFO_API_KEY'` >`export default IP_INFO_API_KEY`
- Rename IP_INFO_API_KEY_EXAMPLE.js in IP_INFO_API_KEY.js
- Create a feature branch
  > git checkout -b feature/NewFeature
- Commit your changes
  > git commit -m 'Add NewFeature'
- Push the branch
  > git push origin feature/AmazingFeature
- Open a pull Request

_[How to use Git?](https://docs.github.com/fr/get-started/using-git/about-git)_

## Contact

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ga%C3%ABtan-tremois-a956a91a3)
