import React from "react";

import { Stack, Box, Typography } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import ListJobs from "./ListJobs";

interface MainMakerViewProps {
  jobs: JobType[];
}

const MainMakerView = (props: MainMakerViewProps) => {
  return (
    <Stack spacing={2} direction="column">
      <Stack spacing={2} direction="row" sx={styles.header}>
        <Typography variant="h4" sx={styles.title}>
          Jobs
        </Typography>
      </Stack>
      {props.jobs.length === 0 && <Box sx={styles.noElements}>No jobs added</Box>}
      {props.jobs.length > 0 && <ListJobs />}
    </Stack>
  );
};

const styles = {
  header: {
    mt: 4,
  },
  title: {
    flex: 1,
    textAlign: "left",
  },
  btn: {
    mt: 2,
    minWidth: "100px",
  },
  noElements: {
    pt: 8,
    textAlign: "center",
  },
};

const mapStateToProps = (state: StateType) => {
  return {
    jobs: state.makerReducer.jobs,
  };
};

export default withParamsAndNavigate(MainMakerView, mapStateToProps);
