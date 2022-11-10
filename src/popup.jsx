import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {
    Box, ChakraProvider, VStack, Flex, HStack, Image,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    DrawerContent,
    Select,
    Stack,
    Avatar,
    AvatarBadge,
    Text, FormControl, Input, Heading, Button, FormLabel, Textarea, Icon, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Accordion,
    AccordionItem,
    useToast,
    AccordionButton,
    AccordionPanel,
    DrawerCloseButton,
    AccordionIcon,
    Tag,
    Container,
    Center,
    Square,
    Circle,
    Link,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    ColorModeScript,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatGroup,
} from '@chakra-ui/react'
import { HamburgerIcon, AddIcon, MinusIcon, ChevronDownIcon, SpinnerIcon } from '@chakra-ui/icons'
import ReactDOM from 'react-dom/client'
import { BsTags } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { RiFoldersLine } from 'react-icons/ri'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { TiTickOutline } from 'react-icons/ti'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { extendTheme } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

function Popup() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: MOpen, onOpen: MOnOpen, onClose: MOnClose } = useDisclosure()
    const { isOpen: AOpen, onOpen: AOnOpen, onClose: AOnClose } = useDisclosure()
    const { isOpen: LisOpen, onOpen: LOnOpen, onClose: LOnClose } = useDisclosure()
    const { isOpen: fOpen, onOpen: fOnOpen, onClose: fOnClose } = useDisclosure()
    const { isOpen: tOpen, onOpen: tOnOpen, onClose: tOnClose } = useDisclosure()
    const { isOpen: caOpen, onOpen: caOnOpen, onClose: caOnClose } = useDisclosure()
    const { isOpen: SpaceOpen, onOpen: SpaceOnOpen, onClose: SpaceOnClose } = useDisclosure()
    const { isOpen: TcOpen, onOpen: TcOnOpen, onClose: TcOnClose } = useDisclosure()
    const { isOpen: addTaskisOpen, onOpen: addTaskonOpen, onClose: addTaskonClose } = useDisclosure()

    const [placement, setPlacement] = React.useState('right')


    const btnRef = React.useRef()
    const btn2Ref = React.useRef()
    const btn3Ref = React.useRef()
    const btn4Ref = React.useRef()
    const btn5Ref = React.useRef()
    const btn6Ref = React.useRef()
    const btn7Ref = React.useRef()
    const addTaskRef = React.useRef(null)
    const [value, setValue] = React.useState('1')


    const [j, setJ] = useState('')
    const [Code, setCode] = useState('')
    const [AccessToken, setAccessToken] = useState('')

    const [currentTag, SetCurrentTag] = useState('')
    const [Tags, setTags] = useState([])

    const [currentAssigned, SetCurrentAssigned] = useState('')
    const [Assigned, SetAssigned] = useState([])
    const finalRef = React.useRef(null)
    const SpaceRef = React.useRef(null)


    const [AllTeams, SetTeams] = useState([])
    const toast = useToast()

    const [currentTeam, setCurrentTeam] = useState('')
    const [currentTask, setCurrentTask] = useState('')
    const [showTag, setShowTag] = useState(false)
    const [CurrentTeamAvatar, setCurrentTeamAvatar] = useState('')
    const [Spaces, SetSpaces] = useState([])
    const [Folders, SetFolders] = useState([])
    const [Lists, SetLists] = useState([])
    const [Tasks, SetTasks] = useState([])
    const [OneTask, SetOneTask] = useState({})
    const [Comments, SetComments] = useState('')

    const [currentSpace, setCurrentSpace] = useState('')
    const [currentFolder, setCurrentFolder] = useState('')
    const [currentList, setCurrentList] = useState('')
    const [description, setDescription] = useState('')

    const [title, setTitle] = useState('')
    const [searchInput, setsearchInput] = useState('')
    const [inputfiles, setinputfiles] = useState([])
    const [dueDate, setdueDate] = useState('')
    const { register, handleSubmit } = useForm();

    chrome.storage.sync.get('text', function (text) {
        setJ(text.text)
    })

    chrome.storage.sync.get('code', function (code) {
        setCode(code.code)
        if (AccessToken === '') {
            GetMyAccessToken(code.code)
        }
    })




    const GetMyAccessToken = async (Code) => {

        const data = await fetch(`https://api.clickup.com/api/v2/oauth/token?client_id=CHG5GARUKM341LII1Q4ZJAY4083G6P0E&client_secret=DZI69WB2QAOK7QJ63DXOSKN7Y9YBOX8H9BGNTT9CWT3G86ZLCTYRCFYMTTWGUMHT&code=${Code}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const jdata = await data.json()
        chrome.storage.sync.set({ 'access_token': jdata.access_token })
    }





    chrome.storage.sync.get('team', function (team_id) {
        if (typeof (team_id) !== undefined) {
            setCurrentTeam(team_id.team)

            let av = AllTeams?.find(item => item.id === team_id.team)
            setCurrentTeamAvatar(av?.avatar)
        }
        else {
            setCurrentTeam("")
        }
    })





    chrome.storage.sync.get('access_token', function (access_token) {
        if (access_token) {
            setAccessToken(access_token.access_token)

        }
    })


    useEffect(() => {
        if (AccessToken !== '') {
            const GetMyteams = async () => {

                const data = await fetch("https://api.clickup.com/api/v2/team", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": AccessToken
                    }
                })
                const jdata = await data.json()
                SetTeams(jdata.teams)

            }
            GetMyteams()
        }
    }, [AccessToken])




    const setCurrentTeamWithGoogle = (id) => {
        if (id) {
            chrome.storage.sync.set({ 'team': id })

            let av = AllTeams?.find(item => item.id === id)
            setCurrentTeamAvatar(av.avatar)
        }
    }





    useEffect(() => {
        const GetMySpaces = async () => {
            if (currentTeam !== '') {
                const data = await fetch(`https://api.clickup.com/api/v2/team/${currentTeam}/space`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": AccessToken
                    }
                })
                const jdata = await data.json()
                SetSpaces(jdata.spaces)
            }

        }
        GetMySpaces()
    }, [currentTeam])







    useEffect(() => {
        if (currentSpace.length > 0) {
            const GetMyFolders = async () => {

                const data = await fetch(`https://api.clickup.com/api/v2/space/${currentSpace}/folder`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": AccessToken
                    }
                })
                const jdata = await data.json()
                SetFolders(jdata.folders)
            }
            GetMyFolders()
        }
    }, [currentSpace, currentSpace.length])

    const GetMyLists = async () => {
        if (currentFolder.length > 0) {
            SetLists(Folders[0]?.lists)
        }

    }


    const AddNewTag = () => {
        let clone = [...Tags]
        clone.push(currentTag)
        setTags(clone)
    }

    const AddNewAssignee = () => {
        let clone = [...Assigned]
        clone.push(currentAssigned)
        SetAssigned(clone)
    }



    const SendData = async (e) => {
        const d1 = new Date();

        e.preventDefault()
        let obj = {
            name: title,
            description: description,
            assignees: [],
            tags: [],
            due_date: (d1.getTime()).toString()
        }
        let clone = [...Tasks]
        clone.push(obj)
        SetTasks(clone)

        const data = await fetch(`https://api.clickup.com/api/v2/list/${currentList}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AccessToken
            },
            body: JSON.stringify(obj)
        })
        const jdata = await data.json()
        if (data.status == 200) {
            toast({
                size: 'xs',
                title: "Folder",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }
        else {
            toast({
                size: 'xs',
                title: "Invalid",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }

        setTitle('')
        setDescription('')
        setTags([])
        SetAssigned([])


    }



    const GetMyTasks = async (currentList) => {
        const data = await fetch(`https://api.clickup.com/api/v2/list/${currentList}/task`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AccessToken
            }
        })
        const jdata = await data.json()

        SetTasks(jdata.tasks)

    }


    const GetATask = async (id) => {

        const data = await fetch(`https://api.clickup.com/api/v2/task/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AccessToken
            }
        })
        const jdata = await data.json()
        SetOneTask(jdata)
    }

    // const UpdateTask = async (updated, id) => {
    //     let obj = {

    //         name: updated.name,
    //         description: updated.description,
    //         tags: updated.tags
    //     }



    //     const data = await fetch(`https://api.clickup.com/api/v2/task/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": AccessToken,
    //         },
    //         body: JSON.stringify(obj)
    //     })
    //     const jdata = await data.json()
    //     if (data.status == 200) {
    //         toast({
    //             size: 'xs',
    //             title: "Task updated",
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //             position: 'top'
    //         })
    //     }
    //     else {
    //         toast({
    //             size: 'xs',
    //             title: "Something went wrong",
    //             status: 'error',
    //             duration: 3000,
    //             isClosable: true,
    //             position: 'top'
    //         })
    //     }

    // }

    const DeleteTask = async (id) => {

        const data = await fetch(`https://api.clickup.com/api/v2/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AccessToken
            }
        })



        if (!data) {
            toast({
                size: 'xs',
                title: "Invalid Request",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })

        }
        else {
            toast({
                size: 'xs',
                title: "Folder deleted",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }
        const newTasks = Tasks.filter((ele) => ele.id != id)
        SetTasks(newTasks)
        SetOneTask({})

    }

    const GetMyComments = async (id) => {
        const data = await fetch(`https://api.clickup.com/api/v2/task/${id}/comment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": AccessToken
            }
        })

        const jdata = await data.json();
        SetComments(jdata.comments);
    }


    const theme = extendTheme({
        size: {
            heading: '20px'
        },
        fonts: {
            heading: `'Open Sans', sans-serif`,
            body: `'Raleway', sans-serif`,
        },
        colors: {
            primaryFontColor: "white",
            secondaryFontColor: "gray"
        }
    })

    const onSubmit = async (fileInput) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "pk_61228295_763L3EM6AZ84KLSE40RUPSYKCG6TKL74");
        const form = document.getElementById('form');
        var formdata = new FormData(form);
        formdata.append("attachment", fileInput);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        fetch(`https://api.clickup.com/api/v2/task/${currentTask}/attachment`, requestOptions)
            .then(response => response.text())
            .then(result => alert("File uploaded"))
            .catch(error => alert("Something went wrong"));
    }


    return (AccessToken) ? (

        <Box w='400px' h='500px' bgGradient='linear(to-r, #000000, #923CB5)' overflowY={'scroll'} overflowX={'hidden'}>
            <Grid
                h='100px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={1}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            size='lg'
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            bg='#923CB5'
                            mt='10px'
                            ml='10px'
                            mb='10px'
                            mr='0px'
                        />
                        <MenuList>
                            <MenuItem>
                                <Button size={'xs'} onClick={() => { window.open("https://app.clickup.com/", "Click Up") }}>
                                    Profile
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button size={'xs'} onClick={onOpen}>
                                    Teams
                                    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Choose your Team</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                {
                                                    AllTeams && AllTeams.length > 0 ? (
                                                        AllTeams?.map((item, i) => (
                                                            <Box spacing={3} key={i}>
                                                                <Avatar
                                                                    name={item.name}
                                                                    key={i}
                                                                    cursor={'pointer'} size={'sm'}>
                                                                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                                </Avatar>
                                                                <Button
                                                                    bg="white"
                                                                    size={'sm'}
                                                                    ml='4px'
                                                                    ref={btn5Ref}
                                                                    onClick={() => setCurrentTeamWithGoogle(item.id) && { SOnOpen }}
                                                                    _hover={{ bg: 'gray.400', color: 'white' }}
                                                                >
                                                                    {item.name}
                                                                </Button>
                                                            </Box>

                                                        ))


                                                    ) : (<Box>
                                                        No teams
                                                    </Box>)

                                                }

                                            </ModalBody>
                                            <ModalFooter>
                                                <Button mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button onClick={() => { chrome.storage.sync.clear() }} size={'xs'}>
                                    Logout
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </GridItem>
                <GridItem colSpan={4} />
                <GridItem colSpan={4}>
                    <Heading color='white' h='100px' fontSize='40px'>ClickUpLoadIt</Heading>
                </GridItem>
            </Grid>

            <Box>
                <Center>
                    <Menu>
                        <MenuButton as={Button} bg='transparent' color={'white'} rightIcon={<ChevronDownIcon />}>
                            Change workspace
                        </MenuButton>
                        <MenuList>
                            {
                                Spaces && Spaces.length > 0 ? (
                                    Spaces.map((item, i) => (

                                        <MenuItem minH='48px' onClick={() => { setCurrentSpace(item.id) }}>
                                            <span>{item.name}</span>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <Box>No workspaces</Box>
                                )
                            }
                        </MenuList>
                    </Menu>
                </Center>
            </Box>
            <Divider bg={'white'} color='white' borderWidth='2px' />
            <>
                <Center>
                    <Button onClick={fOnOpen} color='white' bg='transparent' rightIcon={<ChevronDownIcon />}>
                        Change List
                    </Button>
                </Center>
                <Drawer placement={placement} onClose={fOnClose} isOpen={fOpen} bgGradient='linear(to-r, #000000, #923CB5)'>
                    <DrawerOverlay />
                    <DrawerContent bgGradient='linear(to-r, #000000, #923CB5)' color={'white'}>
                        <DrawerHeader color={'white'} borderBottomWidth='1px'> Folders:</DrawerHeader>
                        <DrawerBody bgGradient='linear(to-r, #000000, #923CB5)'>
                            <Text fontWeight={700} color={'white'} >
                                <Icon as={RiFoldersLine} color='white' /> Folders:
                            </Text>
                            {
                                Folders && Folders.length > 0 ? (
                                    Folders?.map((item, i) => (
                                        <Box key={i}>

                                            <VStack py={3} alignItems={'flex-start'} px={3}>

                                                <Text
                                                    color={'white'}
                                                    fontWeight={700} fontSize={'s'}>
                                                    {item.name} :-
                                                </Text>
                                                <Text fontWeight={700} color='white' size='lg'>
                                                    <Icon as={AiOutlineUnorderedList} color='white' /> Lists:
                                                </Text>
                                                {
                                                    item.lists && item.lists.length > 0 ? (
                                                        item.lists?.map((item2, i) => (
                                                            <Box w="100%" key={i}>

                                                                <Text
                                                                    ref={btn3Ref}
                                                                    onClick={() => { setCurrentList(item2.id); setCurrentFolder(item.id); GetMyTasks(item2.id); LOnOpen() }}
                                                                    color={'white'}
                                                                    px={3}
                                                                    fontWeight={700} fontSize={'s'}
                                                                    _hover={{ cursor: 'pointer' }}>
                                                                    - {item2.name}
                                                                </Text>

                                                            </Box>
                                                        ))
                                                    ) : (<Box>
                                                        No lists
                                                    </Box>)


                                                }

                                            </VStack>

                                        </Box>
                                    ))
                                ) : (<Box>
                                    No folders</Box>)
                            }

                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
            <Divider bg={'white'} color='white' borderWidth='2px' />
            <Box>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                    <GridItem colSpan={3} h='10'>

                        <Heading color={'white'} ml='125px' mt='8px'>Repos</Heading>

                    </GridItem>
                    <GridItem colStart={5} colEnd={6} h='10'>
                        <Center>
                            <>
                                <Button onClick={() => {
                                    addTaskonOpen();
                                }}
                                    ml='20px' mt='20px' type="submit" size='xs' color='white' bg='black'>
                                    Add Repo
                                </Button>
                            </>
                        </Center>
                    </GridItem>
                </Grid>
            </Box>

            <Modal
                initialFocusRef={addTaskRef}
                isOpen={addTaskisOpen}
                onClose={addTaskonClose}
            >
                <ModalOverlay />
                <ModalContent bgGradient='linear(to-r, #000000, #923CB5)'>
                    <ModalHeader color='white'>New Repo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box w="100%" h="13%">
                            <Input
                                color='white'
                                w="100%" h="100%" placeholder='Repo name'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant={'flushed'}
                                borderRadius={0}
                                borderTop={'none'}
                                borderLeft={'none'}
                                borderRight={'none'}
                                m='4px'
                            />
                        </Box>

                        <Box w="100%" h="45%">
                            <Textarea
                                color='white'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                h="100%"
                                m='2px'
                                placeholder='description' />
                        </Box>

                    </ModalBody >

                    <ModalFooter>
                        <Button bg='black' color='white' mr={3} onClick={(e) => { addTaskonClose(); SetCurrentAssigned([]); setTags([]); setdueDate('0'); SendData(e); }}>
                            Save
                        </Button>
                        <Button bg='black' color='white' onClick={addTaskonClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent >
            </Modal >


            <Accordion color='white' mt='20px' allowMultiple>

                {
                    Tasks && Tasks.length > 0 ? (
                        Tasks?.map((item, i) => (
                            <Box>
                                <AccordionItem onClick={() => { setCurrentTask(item.id); GetMyComments(item.id) }}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                {item.name}

                                            </Box >
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Box flex='1' textAlign='left' mb='2px'>
                                            Description:  {item.description}
                                        </Box>

                                        <Box mb='4px' mt='10px'>
                                            <form onSubmit={handleSubmit(onSubmit)} id='form'>
                                                <input type="file" {...register("attachment")} />

                                                <Button type="submit" size='xs' color='white' bg='black'>Submit</Button>
                                            </form>
                                        </Box>
                                        <Box mt='10px'>
                                            <Button mt='4px' type="submit" size='xs' color='white' bg='black' onClick={() => { window.open(`https://app.clickup.com/t/${currentTask}`, "ClickUp Files") }}>Download</Button>
                                            <Button
                                                ml='6px'
                                                size={'xs'}
                                                bg='red.400'
                                                color={'white'}
                                                onClick={() => { DeleteTask(item.id) }}>
                                                Delete
                                            </Button>

                                        </Box>


                                    </AccordionPanel>
                                </AccordionItem>
                            </Box>

                        ))
                    ) : (
                        <Center> <Box fontSize={'14px'} m={'60px'} mt='80px' as='i'> It's so empty here :(</Box>
                        </Center>)
                }
            </Accordion >
        </Box >

    )


        : (
            <Center>
                <Box w='300px' h='400px' pt='150px' pb='100px' pl='80px' pr='80px' bgGradient='linear(to-r, #000000, #923CB5)'>
                    <Image src='./clickup.png' alt='ClickUp'>

                    </Image>
                    <Button onClick={() => { window.open("https://app.clickup.com/api?client_id=CHG5GARUKM341LII1Q4ZJAY4083G6P0E&redirect_uri=https://mellow-stroopwafel-5a4e10.netlify.app/", "ClickUp Auth") }} bg="#232526" m='10px' ml='30px' color="white" font='sans-serif'>Login</Button>
                </Box>
            </Center>
        )


}




const root = ReactDOM.createRoot(document.getElementById("react-target"));


root.render(
    <ChakraProvider>
        <Popup />
    </ChakraProvider>
)

