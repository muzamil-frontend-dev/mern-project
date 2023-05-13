import React, { useEffect } from "react";
import { Col, Row, Table, Button, Badge, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  adminUsersListSelector,
  getUsersList,
} from "../../features/admin/users/adminUsersList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import {
  adminUser,
  makeAdminUserSelector,
} from "../../features/admin/users/makeAdminUser";

const UserListScreen = () => {
  const { loading, users, error } = useSelector(adminUsersListSelector);
  const {
    loading: makeAdminLoading,
    status,
    error: makeAdminError,
  } = useSelector(makeAdminUserSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch, status]);

  const handleStatusChange = (status, id) => {
    dispatch(adminUser(status, id));
  };

  return (
    <Row>
      <Col>
        {loading || (makeAdminLoading && <Loading />)}
        {error ||
          (makeAdminError && <Message>{error || makeAdminError}</Message>)}
        {users && (
          <Table className="text-center" variant="stripped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <Badge pill>Admin User</Badge>
                    ) : (
                      <Form.Check
                        required
                        type="switch"
                        onChange={(e) =>
                          handleStatusChange(e.target.checked, user._id)
                        }
                      />
                    )}
                  </td>
                  {/* <td>
                    <Button size="sm" variant="danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="ms-2"
                      // onClick={() => editProduct(p._id)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserListScreen;
