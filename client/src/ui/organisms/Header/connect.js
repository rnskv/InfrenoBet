import * as betMakerDomain from 'src/redux/betMaker/domains';
import * as betMakerActions from 'src/redux/betMaker/actions';

export function mapDispatchToProps(dispatch) {
    return {

    };
}

export function mapStateToProps(state) {
    return {
        profile: state.user.profile,
    };
}
