import React from 'react'

import { Paper, Container, Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#D4D4D4",
          width: "100%",
          p: 2,
          margin: 0,
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              backgroundColor: "#D4D4D4",
            }}
          >
            <svg
              width="199"
              height="33"
              viewBox="0 0 199 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.6875 29.7745C26.6875 29.562 26.6123 29.3705 26.4913 29.2285C26.6128 29.052 26.6875 28.832 26.6875 28.5915C26.6875 28.3126 26.589 28.0451 26.4136 27.8478C26.2381 27.6505 26.0002 27.5396 25.7521 27.5395C25.6458 27.5395 25.5448 27.5635 25.4501 27.6005C25.4061 27.4923 25.3406 27.3968 25.2587 27.3214C25.1767 27.246 25.0806 27.1927 24.9775 27.1655C24.8744 27.1384 24.7672 27.1381 24.664 27.1647C24.5608 27.1913 24.4644 27.2441 24.3821 27.319C24.4053 27.2037 24.405 27.0841 24.3815 26.9689C24.358 26.8537 24.3118 26.746 24.2462 26.6536C24.1807 26.5612 24.0975 26.4865 24.0029 26.4351C23.9082 26.3837 23.8045 26.3568 23.6994 26.3565C23.3542 26.3565 23.0682 26.638 23.0095 27.007C22.9263 26.927 22.8206 26.8828 22.7111 26.882C22.4531 26.882 22.2436 27.1175 22.2436 27.409V20.93H24.1847L21.189 17.18H16.7517V7.6575H19.4659L16.041 5.4555V2.638H16.5471V1.5H13.007V2.638H13.5132V3.8295L9.89039 1.5L0.314468 7.6575H3.02859V17.18L0 20.93H1.94107V26.578C1.81095 26.436 1.63672 26.3565 1.45536 26.3565C1.1102 26.3565 0.824199 26.638 0.765486 27.007C0.682241 26.927 0.576521 26.8828 0.467031 26.882C0.209497 26.882 0 27.117 0 27.4085V31.5H26.6875V30.5625H25.9865C26.3735 30.5625 26.6875 30.209 26.6875 29.7745ZM0.818417 27.934C0.947851 27.934 1.05193 28.051 1.05193 28.1965C1.05193 28.342 0.947851 28.1525 0.818417 28.1525C0.688982 28.1525 0.584901 28.342 0.584901 28.1965C0.584901 28.051 0.688982 27.934 0.818417 27.934ZM0.418549 28.987C0.289559 28.987 0.185033 29.1325 0.185033 28.987C0.187661 28.9193 0.213436 28.8553 0.256982 28.8085C0.300529 28.7616 0.358487 28.7355 0.418771 28.7355C0.479056 28.7355 0.537014 28.7616 0.58056 28.8085C0.624107 28.8553 0.649881 28.9193 0.652509 28.987C0.652954 29.1325 0.547983 28.987 0.418549 28.987ZM1.2214 29.7745C0.962974 29.7745 0.753477 30.18 0.753477 29.889C0.753477 29.7495 0.802776 29.6157 0.890528 29.5171C0.97828 29.4184 1.0973 29.363 1.2214 29.363C1.3455 29.363 1.46452 29.4184 1.55227 29.5171C1.64002 29.6157 1.68932 29.7495 1.68932 29.889C1.68932 30.1795 1.47982 29.7745 1.2214 29.7745ZM1.51852 27.575C1.34372 27.575 1.20183 27.868 1.20183 27.671C1.20023 27.6231 1.20725 27.5753 1.22245 27.5305C1.23766 27.4857 1.26075 27.4449 1.29033 27.4103C1.31992 27.3758 1.35539 27.3483 1.39464 27.3296C1.43389 27.3108 1.47609 27.3012 1.51874 27.3012C1.56139 27.3012 1.6036 27.3108 1.64284 27.3296C1.68209 27.3483 1.71756 27.3758 1.74715 27.4103C1.77674 27.4449 1.79982 27.4857 1.81503 27.5305C1.83024 27.5753 1.83725 27.6231 1.83566 27.671C1.83566 27.868 1.69377 27.575 1.51852 27.575ZM3.91817 7.6575H15.8631V17.18H3.91817V7.6575ZM2.68788 29.4155C2.51263 29.4155 2.37118 29.7085 2.37118 29.5115C2.37118 29.4171 2.40455 29.3265 2.46394 29.2598C2.52333 29.193 2.60388 29.1555 2.68788 29.1555C2.77187 29.1555 2.85242 29.193 2.91181 29.2598C2.9712 29.3265 3.00457 29.4171 3.00457 29.5115C3.00457 29.7085 2.86312 29.4155 2.68788 29.4155ZM2.97121 28.5285C2.97121 28.4591 2.98337 28.3904 3.007 28.3263C3.03062 28.2621 3.06525 28.2039 3.10891 28.1548C3.15257 28.1057 3.2044 28.0668 3.26144 28.0402C3.31848 28.0137 3.37961 28 3.44135 28C3.50309 28 3.56423 28.0137 3.62127 28.0402C3.67831 28.0668 3.73014 28.1057 3.7738 28.1548C3.81745 28.2039 3.85208 28.2621 3.87571 28.3263C3.89934 28.3904 3.9115 28.4591 3.9115 28.5285C3.9115 28.8205 3.70067 28.361 3.44091 28.361C3.18159 28.361 2.97121 28.8205 2.97121 28.5285ZM3.69266 29.776C3.56323 29.776 3.45915 29.921 3.45915 29.776C3.45915 29.6305 3.56323 29.5135 3.69266 29.5135C3.82209 29.5135 3.92618 29.6305 3.92618 29.776C3.92618 29.921 3.82209 29.776 3.69266 29.776ZM10.3948 27.5075C10.3202 27.5075 10.2486 27.4742 10.1959 27.4149C10.1431 27.3556 10.1135 27.2751 10.1135 27.1912C10.1135 27.1074 10.1431 27.0269 10.1959 26.9676C10.2486 26.9083 10.3202 26.875 10.3948 26.875C10.4694 26.875 10.541 26.9083 10.5937 26.9676C10.6465 27.0269 10.6761 27.1074 10.6761 27.1912C10.6761 27.2751 10.6465 27.3556 10.5937 27.4149C10.541 27.4742 10.4694 27.5075 10.3948 27.5075ZM11.05 30.5V24.662H11.4254V23.82H6.92941V24.6625H7.30392V30.5H4.01558C4.12044 30.4505 4.21296 30.3729 4.28513 30.2741C4.35729 30.1753 4.40692 30.0581 4.42971 29.9329C4.45249 29.8076 4.44775 29.678 4.41589 29.5552C4.38403 29.4325 4.32601 29.3203 4.24687 29.2285C4.3683 29.0515 4.44302 28.832 4.44302 28.5915C4.44302 28.3126 4.34449 28.0451 4.16908 27.8478C3.99367 27.6505 3.75575 27.5396 3.50763 27.5395C3.40132 27.5395 3.30035 27.5635 3.20561 27.6005C3.12882 27.4214 2.99477 27.2814 2.83021 27.2085V20.93H21.354V30.5H11.05ZM23.0629 27.934C23.1923 27.934 23.2964 28.051 23.2964 28.1965C23.2964 28.342 23.1923 28.1525 23.0629 28.1525C22.9335 28.1525 22.8294 28.342 22.8294 28.1965C22.8294 28.051 22.9335 27.934 23.0629 27.934ZM22.663 28.987C22.534 28.987 22.4295 29.1325 22.4295 28.987C22.4321 28.9193 22.4579 28.8553 22.5015 28.8085C22.545 28.7616 22.603 28.7355 22.6632 28.7355C22.7235 28.7355 22.7815 28.7616 22.825 28.8085C22.8686 28.8553 22.8944 28.9193 22.897 28.987C22.8974 29.1325 22.7925 28.987 22.663 28.987ZM23.4654 29.7745C23.2075 29.7745 22.998 30.18 22.998 29.889C22.998 29.7495 23.0473 29.6157 23.135 29.5171C23.2228 29.4184 23.3418 29.363 23.4659 29.363C23.59 29.363 23.709 29.4184 23.7967 29.5171C23.8845 29.6157 23.9338 29.7495 23.9338 29.889C23.9338 30.1795 23.7243 29.7745 23.4654 29.7745ZM23.763 27.575C23.5882 27.575 23.4463 27.868 23.4463 27.671C23.4447 27.6231 23.4517 27.5753 23.4669 27.5305C23.4821 27.4857 23.5052 27.4449 23.5348 27.4103C23.5644 27.3758 23.5999 27.3483 23.6391 27.3296C23.6784 27.3108 23.7206 27.3012 23.7632 27.3012C23.8059 27.3012 23.8481 27.3108 23.8873 27.3296C23.9266 27.3483 23.962 27.3758 23.9916 27.4103C24.0212 27.4449 24.0443 27.4857 24.0595 27.5305C24.0747 27.5753 24.0817 27.6231 24.0801 27.671C24.0801 27.868 23.9378 27.575 23.763 27.575ZM24.9319 29.4155C24.7571 29.4155 24.6157 29.7085 24.6157 29.5115C24.6157 29.4171 24.649 29.3265 24.7084 29.2598C24.7678 29.193 24.8484 29.1555 24.9324 29.1555C25.0163 29.1555 25.0969 29.193 25.1563 29.2598C25.2157 29.3265 25.249 29.4171 25.249 29.5115C25.249 29.7085 25.1072 29.4155 24.9319 29.4155ZM25.2152 28.5285C25.2152 28.3883 25.2648 28.2538 25.353 28.1546C25.4412 28.0555 25.5609 27.9998 25.6856 27.9998C25.8104 27.9998 25.93 28.0555 26.0182 28.1546C26.1064 28.2538 26.156 28.3883 26.156 28.5285C26.156 28.8205 25.9451 28.361 25.6854 28.361C25.4261 28.361 25.2152 28.8205 25.2152 28.5285ZM25.9371 29.776C25.8077 29.776 25.7036 29.921 25.7036 29.776C25.7036 29.6305 25.8077 29.5135 25.9371 29.5135C26.0666 29.5135 26.1707 29.6305 26.1707 29.776C26.1707 29.921 26.0666 29.776 25.9371 29.776Z"
                fill="#0B2C3D"
              />
              <path
                d="M49.5052 8.448C49.1213 8.448 48.8119 8.33066 48.5773 8.096C48.2999 7.81867 48.1613 7.47733 48.1613 7.072C48.1613 6.66667 48.2999 6.32533 48.5773 6.048C48.8119 5.81333 49.1213 5.696 49.5052 5.696C49.9106 5.696 50.2306 5.80267 50.4653 6.016C50.7213 6.29333 50.8493 6.64533 50.8493 7.072C50.8493 7.456 50.7213 7.79733 50.4653 8.096C50.1666 8.33066 49.8466 8.448 49.5052 8.448ZM48.2893 32V11.2H50.7213V32H48.2893ZM60.694 32V23.392L53.814 11.2H56.534L62.262 21.44L67.958 11.2H69.91L63.126 23.232V32H60.694ZM76.7378 32V12.736H70.8178V11.2H85.1218V12.736H79.1698V32H76.7378ZM88.3518 32V11.2H99.5518V12.736H90.7838V20.736H98.8158V22.208H90.7838V30.464H100.256V32H88.3518ZM104.571 32L104.667 11.2L104.731 11.296L104.699 11.2H107.675L115.003 29.024H115.035L122.363 11.2H125.179L125.275 32H122.907L122.811 14.176H122.779L115.579 32H113.627L106.395 14.176L106.331 32H104.571ZM131.289 32V11.2H133.721V30.464H142.969V32H131.289ZM144.08 32L151.088 11.2H153.936L160.816 32H158.288L156.112 25.6H147.952L145.776 32H144.08ZM148.4 24.288H155.696L152.08 13.056L148.4 24.288ZM164.539 32V11.2H166.971V22.528L169.499 20.288L176.507 11.2H178.459L171.163 20.48L179.451 32H176.411L169.371 22.336L166.971 24.352V32H164.539Z"
                fill="#0B2C3D"
              />
            </svg>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              pt: 1,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2022. Tüm Hakları Barış Yenigün'e aittir.
            </Typography>
          </Box>
        </Container>
      </Paper>
  )
}

export default Footer