import { faUncharted } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, } from '@mui/material'
import PageHeaderButton from 'app/components/Button/PageHeaderButton';
import React from 'react'
import MainCard from 'app/components/Cards/MainCard'
import Certificate from './Certificate/Certificate'
import Languages from './Languages/Languages'
import SoftSkills from './SoftSkills/SoftSkills'
import TechnicalSkills from './TechnicalSkills/TechnicalSkills'
import { useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation()
    const state = location?.state
    const [value, setValue] = React.useState(state?.tabValue || 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title={'Skills'}
            button={<PageHeaderButton
                title={'Add'}
                icon={<FontAwesomeIcon icon={faUncharted} />}
                to={value === 0 ? '/admin/skills/technical/create'
                    : value === 1 ? '/admin/skills/certificate/create'
                        : value === 2 ? '/admin/skills/language/create'
                            : value === 3 ? '/admin/skills/soft/create' : ''}
            />}>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}  >
                        <Tab label="Technical" value={0} />
                        <Tab label="Certificate" value={1} />
                        <Tab label="Language" value={2} />
                        <Tab label="Soft" value={3} />
                    </TabList>
                </Box>
                <TabPanel value={0}><TechnicalSkills /></TabPanel>
                <TabPanel value={1}><Certificate /></TabPanel>
                <TabPanel value={2}> <Languages /> </TabPanel>
                <TabPanel value={3}> <SoftSkills /> </TabPanel>
            </TabContext>
        </MainCard>
    )
}

export default Index